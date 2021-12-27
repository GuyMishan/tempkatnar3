import UserLayout from "layouts/Auth";
import React from "react";
import {
  Card,
  Container,
  Button,
  CardTitle,
  CardText,
  CardBody,
  Table
} from "reactstrap";
import { isAuthenticated } from '../../auth/index';


class Profile extends React.Component 
{
  localuser;
  constructor(props) 
  {
    super(props);
    const { user, token } = isAuthenticated();
    this.localuser = user;
  }

  render() {
    return (
      <UserLayout>
        <div>
          <Container className="mt--3">
            <Card className="">
              <CardBody className="px-8 py-5" style={{ textAlign: 'right' }} >
                <CardTitle style={{ textAlign: 'center' }}>פרופיל</CardTitle>
                <Table>
                  <td>
                    <tr> <CardText>שם פרטי</CardText></tr>
                    <tr> <CardText>שם משפחה</CardText></tr>
                    <tr> <CardText>מס' אישי</CardText></tr>
                    <tr> <CardText>פלאפון</CardText></tr>
                  </td>
                  <td>
                    <tr> <CardText>{this.localuser.name}</CardText></tr>
                    <tr> <CardText>{this.localuser.lastname}</CardText></tr>
                    <tr> <CardText>{this.localuser.personalnumber}</CardText></tr>
                    <tr> <CardText>{this.localuser.number}</CardText></tr>
                  </td>

                </Table>
                <Button color="dark" style={{ width: "100%", height: "50px" }}>החלף סיסמא</Button>
              </CardBody>
            </Card>
          </Container>
        </div>
      </UserLayout>
    )
  }
}
export default Profile;