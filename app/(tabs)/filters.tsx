import React, { useState } from "react";
import {
    Box,
    VStack,
    HStack,
    Text,
    Input,
    InputField,
    Checkbox,
    CheckboxIndicator,
    CheckboxIcon,
    CheckIcon,
    CheckboxLabel,
    Pressable,
    Button,
    ScrollView,
} from "@gluestack-ui/themed";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function FiltersScreen() {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const districts = ["Ленинский", "Дзержинский", "Мотовилиха", "Индустриальный"];

    return (
        <Box flex={1} bg="$white" px="$6" pt="$12">
            {/* Шапка */}
            <HStack alignItems="center" justifyContent="center" mb="$6" position="relative">
                <Pressable onPress={() => router.back()} position="absolute" left={0} p="$1">
                    <Ionicons name="chevron-back" size={24} color="#CECECE" />
                </Pressable>
                <Text fontSize={24} fontWeight="$light" color="#000">Фильтры</Text>
            </HStack>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                <VStack space="lg">

                    {/* 1. Средний чек */}
                    <VStack space="xs">
                        <Text fontSize={18} fontWeight="$medium" color="#000" mb="$1">Средний чек</Text>
                        <HStack alignItems="center" space="sm">
                            <Text color="#000" fontSize={14} fontWeight="$light">от</Text>
                            <Input variant="outline" borderRadius="$full" borderColor="#CECECE" h={30} w={80}>
                                <InputField placeholder="" keyboardType="numeric" textAlign="center" fontSize={14} />
                            </Input>
                            <Text color="#000" fontSize={14} fontWeight="$light" ml="$3">до</Text>
                            <Input variant="outline" borderRadius="$full" borderColor="#CECECE" h={30} w={130}>
                                <InputField placeholder="" keyboardType="numeric" textAlign="center" fontSize={14} />
                            </Input>
                        </HStack>
                    </VStack>

                    {/* 2. Район  */}
                    <VStack space="xs">
                        <Text fontSize={18} fontWeight="$medium" color="#000" mb="$1">Район</Text>
                        <Pressable onPress={() => setIsOpen(!isOpen)}>
                            <Box borderWidth={1} borderColor="#CECECE" borderRadius="$xl" px="$4" py="$2.5">
                                <Text fontSize={15} color={selectedDistrict ? "#000" : "#E5E5E5"} fontWeight="$light">
                                    {selectedDistrict || "Выберите район"}
                                </Text>
                                {isOpen && (
                                    <VStack space="xs" mt="$3" borderTopWidth={1} borderTopColor="#F2F2F2" pt="$2">
                                        {districts.map((item) => (
                                            <Pressable key={item} onPress={() => { setSelectedDistrict(item); setIsOpen(false); }}>
                                                <Text color="#666" fontSize={16} fontWeight="$light" py="$1.5">{item}</Text>
                                            </Pressable>
                                        ))}
                                    </VStack>
                                )}
                            </Box>
                        </Pressable>
                    </VStack>

                    {/* 3. Тип заведения  */}
                    <VStack space="xs">
                        <Text fontSize={18} fontWeight="$medium" color="#000" mb="$1">Тип заведения</Text>
                        <HStack>
                            <VStack space="xs" flex={1}>
                                {["Парк", "Ресторан", "Музей", "Арт-объект", "Кинотеатр"].map((l) => (
                                    <FilterCheckbox key={l} label={l} />
                                ))}
                            </VStack>
                            <VStack space="xs" flex={1}>
                                {["Клуб", "Спортивный зал", "Торговый центр", "Аттракцион", "Коворкинг"].map((l) => (
                                    <FilterCheckbox key={l} label={l} />
                                ))}
                            </VStack>
                        </HStack>
                    </VStack>

                    {/* 4. Время посещения */}
                    <VStack space="xs">
                        <Text fontSize={18} fontWeight="$medium" color="#000" mb="$1">Время посещения</Text>
                        <VStack space="xs">
                            {["Утро", "День", "Вечер", "Ночь"].map((l) => (
                                <FilterCheckbox key={l} label={l} />
                            ))}
                        </VStack>
                    </VStack>

                    {/* 5. Количество людей */}
                    <VStack space="xs">
                        <Text fontSize={18} fontWeight="$medium" color="#000" mb="$1">Количество людей</Text>
                        <VStack space="xs">
                            {["Один", "Вдвоем", "Компания", "С семьей"].map((l) => (
                                <FilterCheckbox key={l} label={l} />
                            ))}
                        </VStack>
                    </VStack>

                    {/* Кнопка далее */}
                    <HStack justifyContent="flex-end" mt="$0">
                        <Button
                            w={160}
                            h={55}
                            variant="outline"
                            borderColor="#CECECE"
                            borderRadius={18}
                            onPress={() => router.back()}
                        >
                            <Ionicons name="chevron-forward" size={30} color="#CECECE" />
                        </Button>
                    </HStack>

                </VStack>
            </ScrollView>
        </Box>
    );
}

const FilterCheckbox = ({ label }: { label: string }) => (
    <Checkbox value={label} size="sm" aria-label={label} mb="$1">
        <CheckboxIndicator mr="$2.5" borderColor="#CECECE" borderRadius={4} w={18} h={18}>
            <CheckboxIcon as={CheckIcon} color="#C8F751" size="xs" />
        </CheckboxIndicator>
        <CheckboxLabel color="#000" fontSize={15} fontWeight="$light">
            {label}
        </CheckboxLabel>
    </Checkbox>
);