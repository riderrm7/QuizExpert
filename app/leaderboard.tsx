import React from 'react';
import { useNavigation } from 'expo-router';
import { StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Text, Center, Image, Button, ButtonText } from "@gluestack-ui/themed";
import ImgSilverMedal from '@/assets/images/silver-medal.png';
import ImgGoldMedal from '@/assets/images/gold-medal.png';
import ImgCry from '@/assets/images/cry.png';

type RouteParams = {
    params: {
        score: number;
    };
};

export default function Leaderboard() {
    const router = useRoute<RouteProp<RouteParams>>();
    const navigation = useNavigation();
    const score = router.params.score;
    let imgMedal = ImgGoldMedal;
    let msg = "เก่งขนาดนี้ ติดยศให้เลย!!!";

    if (score <= 5) {
        imgMedal = ImgCry;
        msg = "ตอบถูกน้อยเกินไป";
    } else if (score <= 18) {
        imgMedal = ImgSilverMedal;
        msg = "เกือบดีแล้ว ลองพยามใหม่อีกที";
    }

    return (
        <Center pt="$10" px="$8" bg="$white" h="$full">
            <Image
                alt="medal"
                h={100}
                w="$full"
                resizeMode="contain"
                source={imgMedal}
            />
            <Text fontFamily="MitrRegular" size="2xl">{msg}</Text>
            <Text fontFamily="MitrRegular" size="xl" mt="$5">สรุปคะแนน</Text>
            <Text mb="$10" fontFamily="MitrRegular" size="2xl" mt="$5">{score} / 20</Text>
            <Button size="md" variant="solid" action="primary" onPress={() => {
                navigation.replace('index');
            }}>
                <ButtonText style={{ fontFamily: 'Mitr-Regular' }}>เล่นอีกครั้ง </ButtonText>
            </Button>
        </Center>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
