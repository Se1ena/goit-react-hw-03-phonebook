import React, { Component } from 'react';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Container, Title, TitleContacts } from 'components/Container.styles';

import { nanoid } from 'nanoid'


export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    //console.log('App componentDidMount');

    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if(parsedContacts){
      this.setState({contacts: parsedContacts});
    }

    //console.log(parsedContacts);
    //const contacts = JSON.parse(localStorage.getItem("my-contacts"));
    //this.setState({contacts})
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log('App componentDidUpdate');

    if(this.state.contacts !== prevState.contacts){
      console.log('Оновилось поле contacts, записую contacts в сховище');

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
    //const {contacts} = this.state;
    //localStorage.setItem("my-contacts", JSON.stringify(contacts))
  }

  handleInputChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  addContact = (data) => {
    const { name, number } = data;
    if (this.checkDoubleContact(data)) {
      alert(`${name} is already in your contacts!`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  checkDoubleContact = (inputData) => {
    return this.state.contacts.find(contact => contact.name === inputData.name);
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalized = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalized));
  };

  deleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(el => el.id !== id),
    }));
  };

  render() {
    
    const visibleContacts = this.getVisibleContacts();

    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.addContact} />
        <TitleContacts>Contacts</TitleContacts>
        <Filter value={this.state.filter} onFilter={this.handleInputChange} />
        <ContactList contacts={visibleContacts} deleteContact={this.deleteContact} />
      </Container>
    );
  }
}

