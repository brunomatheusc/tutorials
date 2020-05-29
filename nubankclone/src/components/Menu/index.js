import React from 'react';
import QRCode from 'react-native-qrcode';
import Icon from 'react-native-vector-icons';
import { Container, Code, Nav, NavItem, NavText, SignOutButton, SignOutButtonText } from './styles';

export default function Menu({ translateY }) {
    return (
        <Container style={{
            opacity: translateY.interpolate({
                inputRange: [0, 150],
                outputRange: [0, 1],
            }),
        }}>
            <Code>
                <QRCode
                    value="https://rocketseat.com.br"
                    size={80}
                    fgColor="#fff"
                    bgColor="#8b10ae"
                />
            </Code>

            <Nav>
                <NavItem>
                    <Icon name="help-outline" size={200} color="#fff" />
                    <NavText>Me Ajuda</NavText>
                </NavItem>

                <NavItem>
                    <Icon name="person-outline" size={200} color="#fff" />
                    <NavText>Perfil</NavText>
                </NavItem>

                <NavItem>
                    <Icon name="credit-card" size={200} color="#fff" />
                    <NavText>Configurar cartão</NavText>
                </NavItem>
            </Nav>

            <SignOutButton onPress={ () => {}}>
                <SignOutButtonText>SAIR DO APP</SignOutButtonText>
            </SignOutButton>
        </Container>
    );
}
