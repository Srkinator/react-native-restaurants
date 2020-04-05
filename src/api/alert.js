import { Alert } from 'react-native'


export default (title, description, actions = [], options = {}) => {
  Alert.alert(
    title,
    description,
    actions,
    options
  )
}
