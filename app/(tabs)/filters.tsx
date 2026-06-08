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

    // 1. ДОБАВЛЕНО: Стейты для цены
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
        setSelectedDistrict("");
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
        "фитнес-центр", "Стадион", "Прокат велосипедов", "Бассейны", "Яхт-клуб",
        "Картинг", "Квесты", "spa-салон", "термы", "кофейни", "фаст-фуд",
        "рестораны национальной кухни", "рестораны/кафе", "винотеки",
        "музеи, галереи, выставочные залы", "филармонии, концертные залы",
        "театры", "кино", "мастерские,мастер классы", "достопримечательности",
        "танцевальные клубы", "бары,рюмочные", "эко-тропы", "парки, скверы, сады",
        "зоопарк", "локальные бренды", "сувенирная лавка"
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
                                    <Text fontSize={isTablet ? 18 : 15} color={selectedDistrict ? "#000" : "#E5E5E5"} fontWeight="$light">
                                        {selectedDistrict || "Выберите район"}
                                    </Text>
                                    {isOpen && (
                                        <VStack space="xs" mt="$3" borderTopWidth={1} borderTopColor="#F2F2F2" pt="$2">
                                            {districts.map((item) => {
                                               
                                                const isSelected = selectedDistrict === item;

                                                return (
                                                    <Pressable
                                                        key={item}
                                                        onPress={() => {
                                                            
                                                            setSelectedDistrict(isSelected ? "" : item);
                                                            setIsOpen(false);
                                                        }}
                                                        style={({ pressed }) => ({
                                                            backgroundColor: isSelected ? "#F9F9F9" : (pressed ? "#F2F2F2" : "transparent"),
                                                            borderRadius: 8,
                                                            paddingHorizontal: 8
                                                        })}
                                                    >
                                                        <HStack justifyContent="space-between" alignItems="center" py="$2">
                                                            <Text
                                                                color={isSelected ? "#C8F751" : "#666"} 
                                                                fontSize={16}
                                                                fontWeight={isSelected ? "$medium" : "$light"}
                                                            >
                                                                {item}
                                                            </Text>

                                                           
                                                            {isSelected && (
                                                                <Ionicons name="checkmark" size={18} color="#C8F751" />
                                                            )}
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
                                    key={cat}
                                    w={isTablet ? "31%" : "48%"}
                                    minHeight={45} 
                                    mb="$2"
                                >
                                    <FilterCheckbox
                                        label={cat}
                                        selected={selectedCategories.includes(cat)}
                                        onToggle={() => toggleCategory(cat)}
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
                                {["Утро", "День", "Вечер", "Ночь"].map((l) => (
                                    <Box key={l} w={isTablet ? "50%" : "100%"}>
                                        <FilterCheckbox
                                            label={l}
                                            selected={selectedTime.includes(l)}
                                            onToggle={() => toggleTime(l)}
                                        />
                                    </Box>
                                ))}
                            </HStack>
                        </VStack>

                        <VStack space="xs" flex={1}>
                            <Text fontSize={isTablet ? 22 : 18} fontWeight="$medium" color="#000" mb="$1">Количество людей</Text>
                            <HStack flexWrap="wrap">
                                {["Один", "Вдвоем", "Компания", "С семьей"].map((l) => (
                                    <Box key={l} w={isTablet ? "50%" : "100%"}>
                                        <FilterCheckbox
                                            label={l}
                                            selected={selectedPeople.includes(l)}
                                            onToggle={() => togglePeople(l)}
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
                                        district: selectedDistrict,
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
                <CheckboxIndicator mr="$2" borderColor="#CECECE" borderRadius={4} w={20} h={20} mt="$0.5">
                    <CheckboxIcon as={CheckIcon} color="#C8F751" size="xs" />
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