import { TextInput } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { styles } from "../styles";

export default function Form({
  name,
  cpf,
  age,
  onChangeName,
  onChangeCpf,
  onChangeAge,
}) {
  return (
    <>
      <TextInput
        style={styles.nameInput}
        onChangeText={onChangeName}
        value={name}
        placeholder="Nome"
      />

      <TextInputMask
        style={styles.cpfInput}
        type={"cpf"}
        value={cpf}
        placeholder="CPF"
        onChangeText={onChangeCpf}
        keyboardType="numeric"
      />

      <TextInputMask
        style={styles.ageInput}
        type={'only-numbers'}
        onChangeText={onChangeAge}
        value={age}
        placeholder="Idade"
        keyboardType="numeric"
        maxLength={3}
      />
    </>
  );
}
