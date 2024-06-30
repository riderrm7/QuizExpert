import { Button, Text } from "@gluestack-ui/themed";

interface ChoiceButtonProps {
    label: string;
    onPress: () => void;
}

export default function ChoiceButton({ label, onPress }: ChoiceButtonProps) {
    return (
        <Button size="lg" variant="outline" action="primary" onPress={onPress}>
            <Text fontFamily="MitrRegular" size="lg" color="#0e385d">
                {label}
            </Text>
        </Button>
    );
}
