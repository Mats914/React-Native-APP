import { ListItem, Button } from "@rneui/themed"; 
import { View, Text, FlatList, RefreshControl } from "react-native";
import { useGetUsersQuery, useDeleteUserMutation } from "../../store/api/usersApi";

const UserList = ({ navigation }) => {
  const { data, isLoading, refetch, error } = useGetUsersQuery({});
  const [deleteUser] = useDeleteUserMutation();

  const handleEditUser = (user) => {
    navigation.navigate("UserForm", { user });
  };

  const handleDeleteUser = (user) => {
    deleteUser(user.id).then(() => {
      refetch();
    }).catch(error => {
      console.error("Error deleting user:", error);
    });
  };

  return (
    <View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <View style={{ padding: 16 }}>
          <Text style={{ marginBottom: 12 }}>
            Could not load users. Check Firebase permissions and try again.
          </Text>
          <Button title="Try again" onPress={refetch} />
        </View>
      ) : (
        <FlatList
          data={data || []}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          renderItem={({ item }) => (
            <ListItem key={item.id}>
              <ListItem.Content>
                <ListItem.Title>{`${item.firstName} ${item.lastName}`}</ListItem.Title>
              </ListItem.Content>
              <Button
                title="Edit"
                onPress={() => handleEditUser(item)}
              />
              <Button
                title="Delete"
                onPress={() => handleDeleteUser(item)}
              />
            </ListItem>
          )}
        />
      )}
    </View>
  );
};

export default UserList;
