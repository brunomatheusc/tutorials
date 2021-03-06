import React from 'react'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import { Wrapper, Header, BalanceContainer, BalanceTitle, Balance, IconContainer } from './styles';

export default function Home() {
    return (
        <Wrapper>
            <Header>
                <MaterialCommunityIcons name="qrcode-scan" size={30} color="#10c86e" />

                <BalanceContainer>
                    <BalanceTitle>Meu saldo</BalanceTitle>
                    <Balance>R$ 0,00</Balance>
                </BalanceContainer>

                <IconContainer>
                    <AntDesign name="gift" size={30} color="#10c86e" />
                    <MaterialCommunityIcons name="file-percent" size={30} color="#10c86e" />
                </IconContainer>
            </Header>
        </Wrapper>
    );
}
