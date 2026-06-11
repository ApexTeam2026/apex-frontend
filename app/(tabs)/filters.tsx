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
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);

    const [priceFrom, setPriceFrom] = useState("");
    const [priceTo, setPriceTo] = useState("");

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string[]>([]);
    const [selectedPeople, setSelectedPeople] = useState<string[]>([]);
    const districts = [
        "Ленинский район",
        "Дзержинский район",
        "Мотовилихинский район",
        "Индустриальный район",
        "Свердловский район",
    ];

    const toggleCategory = (val: string) => {
        setSelectedCategories(prev =>
            prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
        );
    };

    const toggleDistrict = (district: string) => {
        setSelectedDistricts((prev) =>
            prev.includes(district)
            ? prev.filter((d) => d !== district)
            : [...prev, district]
        );
    };

    const toggleTime = (val: string) => {
        setSelectedTime(prev =>
            prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
        );
    };

    const togglePeople = (val: string) => {
        setSelectedPeople(prev =>
            prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
        );
    };

    // 2. ИСПРАВЛЕНО: Сброс всех полей, включая новые
    const resetFilters = () => {
        setSelectedCategories([]);
        setSelectedTime([]);
        setSelectedPeople([]);
        setSelectedTags([]);
        setSelectedDistricts([]);
        setPriceFrom("");
        setPriceTo("");

        router.push({
            pathname: "/all-places",
            params: {
                tags: "[]",
                categories: "[]",
                time: "[]",
                people: "[]",
                district: "",
                priceFrom: "",
                priceTo: ""
            },
        })
    };

    const ALL_CATEGORIES = [
        {
            value: "Фитнес-центр",
            label: "Фитнес-центр",
        },
        {
            value: "Стадион",
            label: "Стадион",
        },
        {
            value: "Прокат велосипедов",
            label: "Прокат велосипедов",
        },
        {
            value: "Бассейны",
            label: "Бассейны",
        },
        {
            value: "Яхт-клуб",
            label: "Яхт-клуб",
        },
        {
            value: "Картинг",
            label: "Картинг",
        },
        {
            value: "Квесты",
            label: "Квесты",
        },
        {
            value: "SPA-салон",
            label: "SPA-салон",
        },
        {
            value: "Термы",
            label: "Термы",
        },
        {
            value: "Кофейни",
            label: "Кофейни",
        },
        {
            value: "Фаст-фуд",
            label: "Фаст-фуд",
        },
        {
            value: "Рестораны национальной кухни",
            label: "Рестораны национальной кухни",
        },
        {
            value: "Рестораны/Кафе",
            label: "Рестораны, кафе",
        },
        {
            value: "Винотеки",
            label: "Винотеки",
        },
        {
            value: "Музеи/Галереи/Выставочные залы",
            label: "Музеи, галереи, выставочные залы",
        },
        {
            value: "Филармонии/Концертные залы",
            label: "Филармонии, концертные залы",
        },
        {
            value: "Театры",
            label: "Театры",
        },
        {
            value: "Кино",
            label: "Кино",
        },
        {
            value: "Мастерские/Мастер классы",
            label: "Мастерские, мастер-классы",
        },
        {
            value: "Достопримечательности",
            label: "Достопримечательности",
        },
        {
            value: "Танцевальные клубы",
            label: "Танцевальные клубы",
        },
        {
            value: "Бары/Рюмочные",
            label: "Бары, рюмочные",
        },
        {
            value: "Эко-тропы",
            label: "Эко-тропы",
        },
        {
            value: "Парки/Скверы/Сады",
            label: "Парки, скверы, сады",
        },
        {
            value: "Зоопарк",
            label: "Зоопарк",
        },
        {
            value: "Локальные бренды",
            label: "Локальные бренды",
        },
        {
            value: "Сувенирная лавка",
            label: "Сувенирная лавка",
        },
    ];

    const TIME_OPTIONS = [
        { label: "Утро", value: "morning" },
        { label: "День", value: "daytime" },
        { label: "Вечер", value: "evening" },
        { label: "Ночь", value: "night" },
    ];

    const PEOPLE_OPTIONS = [
        { label: "Один", value: "solo" },
        { label: "Компания друзей", value: "friends" },
        { label: "С семьей", value: "family" },
        { label: "С детьми", value: "kids" },
    ];

    return (
        <Box flex={1} bg="$white" px={isTablet ? "$20" : "$6"} pt={isTablet ? "$20" : "$12"}>
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
                    maxWidth: 1000,
                    alignSelf: 'center'
                }}
            >
                <VStack space="xl">
                    <HStack space="xl" flexDirection={isTablet ? "row" : "column"}>
                        {/* 1. Средний чек */}
                        <VStack space="xs" flex={1}>
                            <Text fontSize={isTablet ? 22 : 18} fontWeight="$medium" color="#000" mb="$1">Средний чек</Text>
                            <HStack alignItems="center" space="sm">
                                <Text color="#000" fontSize={isTablet ? 16 : 14} fontWeight="$light">от</Text>
                                <Input variant="outline" borderRadius="$full" borderColor="#CECECE" h={isTablet ? 45 : 30} flex={1}>
                                    {/* 3. ИСПРАВЛЕНО: Привязка value и onChangeText */}
                                    <InputField
                                        value={priceFrom}
                                        onChangeText={setPriceFrom}
                                        placeholder=""
                                        keyboardType="numeric"
                                        textAlign="center"
                                        fontSize={isTablet ? 16 : 14}
                                    />
                                </Input>
                                <Text color="#000" fontSize={isTablet ? 16 : 14} fontWeight="$light">до</Text>
                                <Input variant="outline" borderRadius="$full" borderColor="#CECECE" h={isTablet ? 45 : 30} flex={1.5}>
                                    <InputField
                                        value={priceTo}
                                        onChangeText={setPriceTo}
                                        placeholder=""
                                        keyboardType="numeric"
                                        textAlign="center"
                                        fontSize={isTablet ? 16 : 14}
                                    />
                                </Input>
                            </HStack>
                        </VStack>

                        {/* 2. Район */}
                        <VStack space="xs" flex={1}>
                            <Text fontSize={isTablet ? 22 : 18} fontWeight="$medium" color="#000" mb="$1">Район</Text>
                            <Pressable onPress={() => setIsOpen(!isOpen)}>
                                <Box borderWidth={1} borderColor="#CECECE" borderRadius="$xl" px="$4" py={isTablet ? "$4" : "$2.5"}>
                                    <Text fontSize={isTablet ? 18 : 15} color={selectedDistricts.length > 0 ? "#000" : "#E5E5E5"} fontWeight="$light">
                                        {selectedDistricts.length > 0
                                        ? selectedDistricts.join(", ")
                                        : "Выберите район"}
                                    </Text>
                                    {isOpen && (
                                        <VStack space="xs" mt="$3" borderTopWidth={1} borderTopColor="#F2F2F2" pt="$2">
                                            <Pressable
                                            onPress={() => setSelectedDistricts([])}
                                            >
                                            <Text
                                                color="#FF6B6B"
                                                fontSize={15}
                                                py="$2"
                                            >
                                                Снять выбор районов
                                            </Text>
                                            </Pressable>
                                            
                                            {districts.map((item) => {
                                               
                                                const isSelected = selectedDistricts.includes(item);

                                                return (
                                                    <Pressable
                                                        key={item}
                                                        onPress={() => {
                                                            toggleDistrict(item);
                                                            //setIsOpen(false);
                                                        }}
                                                        style={({ pressed }) => ({
                                                            backgroundColor: isSelected ? "#F9F9F9" : (pressed ? "#F2F2F2" : "transparent"),
                                                            borderRadius: 8,
                                                            paddingHorizontal: 8
                                                        })}
                                                    >
                                                        <HStack
                                                            justifyContent="space-between"
                                                            alignItems="center"
                                                            py="$2"
                                                        >
                                                            <HStack alignItems="center" space="sm">
                                                                <Box
                                                                    w={20}
                                                                    h={20}
                                                                    borderWidth={1}
                                                                    borderRadius={4}
                                                                    borderColor={isSelected ? "#C8F751" : "#CECECE"}
                                                                    bg={isSelected ? "#C8F751" : "transparent"}
                                                                    justifyContent="center"
                                                                    alignItems="center"
                                                                >
                                                                    {isSelected && (
                                                                        <Ionicons
                                                                            name="checkmark"
                                                                            size={14}
                                                                            color="#000"
                                                                        />
                                                                    )}
                                                                </Box>

                                                                <Text
                                                                    color="#000"
                                                                    fontSize={16}
                                                                    fontWeight="$light"
                                                                >
                                                                    {item}
                                                                </Text>
                                                            </HStack>
                                                        </HStack>
                                                    </Pressable>
                                                );
                                            })}
                                        </VStack>
                                    )}
                                </Box>
                            </Pressable>
                        </VStack>
                    </HStack>

                    {/* Тип заведения */}
                    <VStack space="xs">
                        <Text fontSize={18} fontWeight="$medium" color="#000" mb="$1">Тип заведения</Text>
                        <HStack flexWrap="wrap" justifyContent="space-between">
                            {ALL_CATEGORIES.map((cat) => (
                                <Box
                                    key={cat.value}
                                    w={isTablet ? "31%" : "48%"}
                                    minHeight={45} 
                                    mb="$2"
                                >
                                    <FilterCheckbox
                                        label={cat.label}
                                        selected={selectedCategories.includes(cat.value)}
                                        onToggle={() => toggleCategory(cat.value)}
                                    />
                                </Box>
                            ))}
                        </HStack>
                    </VStack>

                    {/* АДАПТИВ: Время и Количество людей */}
                    <HStack space="xl" flexDirection={isTablet ? "row" : "column"}>
                        <VStack space="xs" flex={1}>
                            <Text fontSize={isTablet ? 22 : 18} fontWeight="$medium" color="#000" mb="$1">Время посещения</Text>
                            <HStack flexWrap="wrap">
                                {TIME_OPTIONS.map((item) => (
                                    <Box key={item.value} w={isTablet ? "50%" : "100%"}>
                                        <FilterCheckbox
                                        label={item.label}
                                        selected={selectedTime.includes(item.value)}
                                        onToggle={() => toggleTime(item.value)}
                                        />
                                    </Box>
                                ))}
                            </HStack>
                        </VStack>

                        <VStack space="xs" flex={1}>
                            <Text fontSize={isTablet ? 22 : 18} fontWeight="$medium" color="#000" mb="$1">Количество людей</Text>
                            <HStack flexWrap="wrap">
                                {PEOPLE_OPTIONS.map((item) => (
                                <Box key={item.value} w={isTablet ? "50%" : "100%"}>
                                    <FilterCheckbox
                                    label={item.label}
                                    selected={selectedPeople.includes(item.value)}
                                    onToggle={() => togglePeople(item.value)}
                                    />
                                </Box>
                                ))}
                            </HStack>
                        </VStack>
                    </HStack>

                    {/* Кнопки */}
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
                                    pathname: "/all-places",
                                    params: {
                                        tags: JSON.stringify(selectedTags),
                                        categories: JSON.stringify(selectedCategories),
                                        time: JSON.stringify(selectedTime),
                                        people: JSON.stringify(selectedPeople),
                                        district: JSON.stringify(selectedDistricts),
                                        priceFrom: priceFrom,
                                        priceTo: priceTo,
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

// Вспомогательный компонент чекбокса
const FilterCheckbox = ({
    label,
    selected,
    onToggle,
}: {
    label: string;
    selected: boolean;
    onToggle: () => void;
}) => {
    const formattedLabel = label.charAt(0).toUpperCase() + label.slice(1);

    return (
        <Checkbox
            value={label}
            isChecked={selected}
            onPress={onToggle}
            size="md" 
        >
            <HStack alignItems="flex-start" w="$full">
                <CheckboxIndicator 
                    mr="$2" 
                    borderColor={selected ? "#C8F751" : "#CECECE"}
                    bg={selected ? "#C8F751" : "transparent"} 
                    borderRadius={4} 
                    w={20} 
                    h={20} 
                    mt="$0.5">
                    <CheckboxIcon as={CheckIcon} color={selected ? "#000" : "transparent"} size="xs" />
                </CheckboxIndicator>

                <CheckboxLabel
                    color="#000"
                    fontSize={15} 
                    fontWeight="$normal" 
                    lineHeight="$sm"
                    flexShrink={1}
                >
                    {formattedLabel}
                </CheckboxLabel>
            </HStack>
        </Checkbox>
    );
};