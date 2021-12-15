import { Component } from "react";
import{
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap"; 

class JoyeModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      open:true,
      activeItem: this.props.activeItem,
    }
  };
  hideModal = () =>{
    this.setState({
      open: !this.state.open,
      activeItem: {
        title: "",
        description: "",
        completed: false,
      }
    })
    this.props.toggle();
  };
  handleChange = (e) =>{
    let {name, value} = e.target;
    if(e.target.type == 'checkbox'){
      value = e.target.checked;
    }
    const activeItem = { ...this.state.activeItem, [name]: value };
    this.setState({ activeItem });
  };
  render(){
    const {toggle, onSave} = this.props;
    return(
      <Modal isOpen={this.state.open} onClose={this.hideModal} toggle={toggle}>
        <ModalHeader toggle={toggle}> To Do Item</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Input type="text" id="title" name="title" value={this.state.activeItem.title} onChange={this.handleChange}/>
          </FormGroup>
          <FormGroup>
            <Input id="description" name="description" value={this.state.activeItem.description} onChange={this.handleChange}></Input>
          </FormGroup>
          <FormGroup>
            <Input type="checkbox" name="completed" checked={this.state.activeItem.completed} onChange={this.handleChange}/> Completed
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.hideModal}>Cancel</Button>
          <Button onClick={()=> onSave(this.state.activeItem)}>Save</Button>
        </ModalFooter>
      </Modal>
    )
  }
}
export default JoyeModal;