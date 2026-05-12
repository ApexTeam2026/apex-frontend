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
import { useWindowDimensions } from "react-native";
export default function FiltersScreen() {
    const { width } = useWindowDimensions();
    const isTablet = width > 768;
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
        <Box flex={1} bg="$white" px={isTablet ? "$20" : "$6"} pt={isTablet ? "$20" : "$12"}>
            {/* Шапка - масштабируется на планшетах */}
            <HStack alignItems="center" justifyContent="center" mb={isTablet ? "$10" : "$6"} position="relative">
                <Pressable onPress={() => router.back()} position="absolute" left={0} p="$1">
                    <Ionicons name="chevron-back" size={isTablet ? 32 : 24} color="#CECECE" />
                </Pressable>
                <Text fontSize={isTablet ? 32 : 24} fontWeight="$light" color="#000">Фильтры</Text>
            </HStack>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 60,
                    width: '100%',
                    maxWidth: 1000, // Ограничение, чтобы на очень широких экранах не расползалось
                    alignSelf: 'center'
                }}
            >
                <VStack space="xl">

                    {/* АДАПТИВ: Средний чек и Район встают в ряд на планшетах */}
                    <HStack space="xl" flexDirection={isTablet ? "row" : "column"}>

                        {/* 1. Средний чек */}
                        <VStack space="xs" flex={1}>
                            <Text fontSize={isTablet ? 22 : 18} fontWeight="$medium" color="#000" mb="$1">Средний чек</Text>
                            <HStack alignItems="center" space="sm">
                                <Text color="#000" fontSize={isTablet ? 16 : 14} fontWeight="$light">от</Text>
                                <Input variant="outline" borderRadius="$full" borderColor="#CECECE" h={isTablet ? 45 : 30} flex={1}>
                                    <InputField placeholder="" keyboardType="numeric" textAlign="center" fontSize={isTablet ? 16 : 14} />
                                </Input>
                                <Text color="#000" fontSize={isTablet ? 16 : 14} fontWeight="$light">до</Text>
                                <Input variant="outline" borderRadius="$full" borderColor="#CECECE" h={isTablet ? 45 : 30} flex={1.5}>
                                    <InputField placeholder="" keyboardType="numeric" textAlign="center" fontSize={isTablet ? 16 : 14} />
                                </Input>
                            </HStack>
                        </VStack>

                        {/* 2. Район */}
                        <VStack space="xs" flex={1}>
                            <Text fontSize={isTablet ? 22 : 18} fontWeight="$medium" color="#000" mb="$1">Район</Text>
                            <Pressable onPress={() => setIsOpen(!isOpen)}>
                                <Box borderWidth={1} borderColor="#CECECE" borderRadius="$xl" px="$4" py={isTablet ? "$4" : "$2.5"}>
                                    <Text fontSize={isTablet ? 18 : 15} color={selectedDistrict ? "#000" : "#E5E5E5"} fontWeight="$light">
                                        {selectedDistrict || "Выберите район"}
                                    </Text>
                                    {isOpen && (
                                        <VStack space="xs" mt="$3" borderTopWidth={1} borderTopColor="#F2F2F2" pt="$2">
                                            {districts.map((item) => (
                                                <Pressable key={item} onPress={() => { setSelectedDistrict(item); setIsOpen(false); }}>
                                                    <Text color="#666" fontSize={isTablet ? 18 : 16} fontWeight="$light" py="$1.5">{item}</Text>
                                                </Pressable>
                                            ))}
                                        </VStack>
                                    )}
                                </Box>
                            </Pressable>
                        </VStack>
                    </HStack>

                    {/* 3. Тип заведения - Сетка 2 колонки на мобайле, 3 на планшете */}
                    <VStack space="xs">
                        <Text fontSize={isTablet ? 22 : 18} fontWeight="$medium" color="#000" mb="$1">Тип заведения</Text>
                        <HStack flexWrap="wrap">
                            {["Парк", "Ресторан", "Музей", "Арт-объект", "Кинотеатр", "Клуб", "Спортивный зал", "Торговый центр", "Аттракцион", "Коворкинг"].map((l) => (
                                <Box key={l} w={isTablet ? "33%" : "50%"}>
                                    <FilterCheckbox
                                        label={l}
                                        selected={selectedCategories.includes(l)}
                                        onToggle={() => toggleCategory(l)}
                                    />
                                </Box>
                            ))}
                        </HStack>
                    </VStack>

                    {/* АДАПТИВ: Время и Количество людей тоже в ряд на планшетах */}
                    <HStack space="xl" flexDirection={isTablet ? "row" : "column"}>
                        {/* 4. Время посещения */}
                        <VStack space="xs" flex={1}>
                            <Text fontSize={isTablet ? 22 : 18} fontWeight="$medium" color="#000" mb="$1">Время посещения</Text>
                            <HStack flexWrap="wrap">
                                {["Утро", "День", "Вечер", "Ночь"].map((l) => (
                                    <Box key={l} w={isTablet ? "50%" : "100%"}>
                                        <FilterCheckbox
                                            key={l}
                                            label={l}
                                            selected={selectedTime.includes(l)}
                                            onToggle={() => toggleTime(l)}
                                        />
                                    </Box>
                                ))}
                            </HStack>
                        </VStack>

                        {/* 5. Количество людей */}
                        <VStack space="xs" flex={1}>
                            <Text fontSize={isTablet ? 22 : 18} fontWeight="$medium" color="#000" mb="$1">Количество людей</Text>
                            <HStack flexWrap="wrap">
                                {["Один", "Вдвоем", "Компания", "С семьей"].map((l) => (
                                    <Box key={l} w={isTablet ? "50%" : "100%"}>
                                        <FilterCheckbox
                                            key={l}
                                            label={l}
                                            selected={selectedPeople.includes(l)}
                                            onToggle={() => togglePeople(l)}
                                        />
                                    </Box>
                                ))}
                            </HStack>
                        </VStack>
                    </HStack>

                    {/* Блок кнопок - прижат вправо на планшете */}
                    <HStack justifyContent={isTablet ? "flex-end" : "space-between"} mt="$10" space="md">
                        <Button
                            variant="outline"
                            borderColor="#CECECE"
                            borderRadius={18}
                            w={isTablet ? 220 : 160}
                            h={isTablet ? 65 : 55}
                            onPress={resetFilters}
                        >
                            <Text color="#000" fontSize={isTablet ? 18 : 16}>Сбросить</Text>
                        </Button>

                        <Button
                            w={isTablet ? 220 : 160}
                            h={isTablet ? 65 : 55}
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
                            <Ionicons name="chevron-forward" size={isTablet ? 40 : 30} color="#CECECE" />
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