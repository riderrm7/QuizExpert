import React, { useState, useEffect } from "react";
import { Pressable } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import ChoiceButton from "@/components/ChoiceButton";
import Questions from "@/constants/Questions";
import { shuffle } from "@/utils/Array";
import { VStack, Box, Center, Image, Text } from "@gluestack-ui/themed";
import ImgQuestion from '@/assets/images/question.png';

interface Question {
    question: string;
    answers: string[];
    correctAnswer: string;
}

let score = 0;
let stateNumber = 0;
const limitQuestion = 20;

export default function Quiz() {
    const router = useRouter();
    const navigation = useNavigation();

    const [questionList, setQuestionList] = useState<Question[]>([]);
    const [currentState, setCurrentState] = useState<Question>({
        question: "",
        answers: [],
        correctAnswer: ""
    });

    useEffect(() => {
        score = 0;
        stateNumber = 0;
        init();

        return () => { };
    }, []);

    function init() {
        let qShuffled = shuffle(Questions).slice(0, limitQuestion);
        setQuestionList(qShuffled);
        setCurrentState(qShuffled[0]);
    }

    function createViewChoices(choices: string[]) {
        if (!choices || choices.length === 0) {
            return null;
        }
        return choices.map((ele, index) => (
            <ChoiceButton
                key={index}
                label={ele}
                onPress={() => selectChoice(ele)}
            />
        ));
    }

    function selectChoice(choice: string) {
        stateNumber++;

        if (choice === currentState.correctAnswer) {
            score++;
        }

        if (stateNumber === limitQuestion) {
            navigation.replace('leaderboard', { stateNumber, score });
            return;
        }

        setCurrentState(questionList[stateNumber]);
    }

    return (
        <Center pt="$10" px="$8" bg="$white" h="$full">
            <Box w="$full">
                <Text textAlign="right" mb="$5" fontFamily="MitrRegular" h="$10" size="md">
                    {stateNumber + 1} / {limitQuestion}
                </Text>
            </Box>
            <Image
                alt="question"
                mb="$6"
                h={180}
                w="$full"
                resizeMode="contain"
                source={ImgQuestion}
            />
            <Text mb="$5" fontFamily="MitrRegular" h="$20" size="2xl" textAlign="center">
                {currentState.question}
            </Text>
            <VStack w="$full" space="lg" px="$1/6">
                {createViewChoices(currentState.answers)}
            </VStack>
        </Center>
    );
}
