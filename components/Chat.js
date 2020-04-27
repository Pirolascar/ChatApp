import React from 'react';
import {connect} from 'react-redux';
import {Text, View, StyleSheet, FlatList, TextInput, Button} from 'react-native';
import { MessageItem } from './MessageItem';
import {chatActions} from '../actions';

@connect (({chat:
                {user,
                channel,
                messages,
                error}
}) => ({user, channel, messages, error}))
export class Chat extends React.Component {

state = {
    text: ''
}

getData() {
    const {messages } = this.props;
    return messages.map((message, i) => ({
        ...message, key: `message_${i}`
    }));
}

handleContentChange = text => {
    this.setState({text});
}

handleSendPress = e => {
    const {dispatch} = this.props;
    const {text} = this.state;
    if(text != '') 
    {
        dispatch(chatActions.sendMessage({text}));
    }
    this.setState({text: ''});
}


    render() {
        const {user, error} = this.props;
        const {text} = this.state;

        return (
            <View style = {styles.container}>              
                {error &&
                <Text>Error: {error.message}</Text>
                }
                <FlatList style={styles.list}
                    data={this.getData()}
                    renderItem={({ item: message})=>
                        <MessageItem user={user} message={message} />
                    }                
                />

                <View style={styles.composerContainer}>
                    <TextInput
                      
                        style={styles.composerInput}
                        placeholder="Write something"
                        value={text}
                        onChangeText={this.handleContentChange}
                    />

                    <Button
                    title="Send"   
                    onPress={this.handleSendPress} 
                    disabled={text ==''}               
                    />
                </View>              

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#EEE'
    },
    list:{
        flex: 1
    },
    composerContainer: {
        flex: 0,
        flexDirection: 'row',
        
        
    },
    composerInput: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 8,
        paddingRight: 8
    }
  });