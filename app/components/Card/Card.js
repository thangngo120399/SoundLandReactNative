import * as React from "react";
import { TouchableOpacity } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="account" />;

const CardItem = ({ item, navigation }) => (
  <Card
    button={true}
    onPress={() => {
      navigation.navigate("Tasks");
    }}
  >
    <Card.Title
      title={item.fullName}
      subtitle="Card Subtitle"
      left={LeftContent}
    />
    <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
    <Card.Content>
      <Title>{item.fullName}</Title>
      <Paragraph>abc </Paragraph>
    </Card.Content>

    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
);

export default CardItem;
