import { useState } from "react";
import {
  Alert,
  Keyboard,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { isValidCPF } from "./utils/validateCpf";
import { styles } from "./styles";
import Form from "./components/Form";

export default function Home() {
  const [name, onChangeName] = useState("");
  const [cpf, onChangeCpf] = useState();
  const [age, onChangeAge] = useState();
  const [list, setList] = useState([]);

  const handleSave = () => {
    if (!name) return Alert.alert("Preencha o campo de nome");
    if (!cpf) return Alert.alert("Preencha o campo de CPF");
    if (!age) return Alert.alert("Preencha o campo de idade");
    if (!isValidCPF(cpf) || cpf.length < 11) return Alert.alert("CPF inválido");
    if (list.find((item) => item.cpf === cpf))
      return Alert.alert("CPF já cadastrado");

    handleClear();
    setList((state) => [
      ...state,
      { id: Math.random().toString(36).substr(2, 9), name, cpf, age },
    ]);
  };

  const handleClear = () => {
    onChangeName("");
    onChangeCpf("");
    onChangeAge("");
  };

  const handleClearList = () => setList([]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Form
          name={name}
          onChangeName={onChangeName}
          cpf={cpf}
          onChangeCpf={onChangeCpf}
          age={age}
          onChangeAge={onChangeAge}
        />

        <View style={styles.buttonContainer}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={handleSave}
          >
            <View style={styles.saveButton}>
              <Text>Salvar</Text>
            </View>
          </TouchableHighlight>

          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={handleClear}
          >
            <View style={styles.clearButton}>
              <Text>Limpar</Text>
            </View>
          </TouchableHighlight>
        </View>

        {list.length > 0 && (
          <View style={styles.listContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text style={styles.listTitle}>Lista de clientes</Text>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                onPress={handleClearList}
              >
                <View style={styles.clearClients}>
                  <Text>Limpar clientes</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View style={styles.list}>
              {list.map((item) => (
                <View style={styles.itensContainer} key={item.id}>
                  <Text style={styles.listItem}>ID: {item.id}</Text>
                  <Text style={styles.listItem}>Nome: {item.name}</Text>
                  <Text style={styles.listItem}>CPF: {item.cpf}</Text>
                  <Text style={styles.listItem}>Idade: {item.age}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
