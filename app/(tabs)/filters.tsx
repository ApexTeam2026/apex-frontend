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
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string[]>([]);
    const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
    const districts = ["Ленинский", "Дзержинский", "Мотовилиха", "Индустриальный"];

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
            ? prev.filter(t => t !== tag)
            : [...prev, tag]
        );
    };

    const toggleCategory = (val: string) => {
        setSelectedCategories(prev =>
            prev.includes(val)
            ? prev.filter(v => v !== val)
            : [...prev, val]
        );
    };

    const toggleTime = (val: string) => {
        setSelectedTime(prev =>
            prev.includes(val)
            ? prev.filter(v => v !== val)
            : [...prev, val]
        );
    };

    const togglePeople = (val: string) => {
        setSelectedPeople(prev =>
            prev.includes(val)
            ? prev.filter(v => v !== val)
            : [...prev, val]
        );
    };

    const resetFilters = () => {
        setSelectedCategories([]);
        setSelectedTime([]);
        setSelectedPeople([]);
        setSelectedTags([]);
        setSelectedDistrict("");

        router.push({
            pathname: "/(tabs)/all-places",
            params: {
            tags: JSON.stringify([]),
            categories: JSON.stringify([]),
            time: JSON.stringify([]),
            people: JSON.stringify([]),
            },
        })
    };

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
                                    <FilterCheckbox
                                        key={l}
                                        label={l}
                                        selected={selectedCategories.includes(l)}
                                        onToggle={() => toggleCategory(l)}
                                    />
                                ))}
                            </VStack>
                            <VStack space="xs" flex={1}>
                                {["Клуб", "Спортивный зал", "Торговый центр", "Аттракцион", "Коворкинг"].map((l) => (
                                    <FilterCheckbox
                                        key={l}
                                        label={l}
                                        selected={selectedCategories.includes(l)}
                                        onToggle={() => toggleCategory(l)}
                                    />
                                ))}
                            </VStack>
                        </HStack>
                    </VStack>

                    {/* 4. Время посещения */}
                    <VStack space="xs">
                        <Text fontSize={18} fontWeight="$medium" color="#000" mb="$1">Время посещения</Text>
                        <VStack space="xs">
                            {["Утро", "День", "Вечер", "Ночь"].map((l) => (
                                <FilterCheckbox
                                    key={l}
                                    label={l}
                                    selected={selectedTime.includes(l)}
                                    onToggle={() => toggleTime(l)}
                                />
                            ))}
                        </VStack>
                    </VStack>

                    {/* 5. Количество людей */}
                    <VStack space="xs">
                        <Text fontSize={18} fontWeight="$medium" color="#000" mb="$1">Количество людей</Text>
                        <VStack space="xs">
                            {["Один", "Вдвоем", "Компания", "С семьей"].map((l) => (
                                <FilterCheckbox
                                    key={l}
                                    label={l}
                                    selected={selectedPeople.includes(l)}
                                    onToggle={() => togglePeople(l)}
                                />
                            ))}
                        </VStack>
                    </VStack>

                    {/* Кнопка далее */}
                    <HStack justifyContent="space-between" mt="$4">
                        <Button
                            variant="outline"
                            borderColor="#CECECE"
                            borderRadius={18}
                            w={160}
                            h={55}
                            onPress={resetFilters}
                        >
                            <Text color="#000">Сбросить</Text>
                        </Button>

                        <Button
                            w={160}
                            h={55}
                            variant="outline"
                            borderColor="#CECECE"
                            borderRadius={18}
                            onPress={() =>
                                router.push({
                                    pathname: "/(tabs)/all-places",
                                    params: {
                                    tags: JSON.stringify(selectedTags),
                                    categories: JSON.stringify(selectedCategories),
                                    time: JSON.stringify(selectedTime),
                                    people: JSON.stringify(selectedPeople),
                                    },
                                })
                            }
                        >
                            <Ionicons name="chevron-forward" size={30} color="#CECECE" />
                        </Button>
                    </HStack>

                </VStack>
            </ScrollView>
        </Box>
    );
}

const FilterCheckbox = ({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) => (
  <Checkbox
    value={label}
    isChecked={selected}
    onPress={onToggle}
    size="sm"
    mb="$1"
  >
    <CheckboxIndicator mr="$2.5" borderColor="#CECECE" borderRadius={4} w={18} h={18}>
      <CheckboxIcon as={CheckIcon} color="#C8F751" size="xs" />
    </CheckboxIndicator>
    <CheckboxLabel color="#000" fontSize={15} fontWeight="$light">
      {label}
    </CheckboxLabel>
  </Checkbox>
);