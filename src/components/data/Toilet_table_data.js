import { ref, reactive } from "vue";


export const Toilet_table_data = reactive({
    //仮データ
    Toilet_table_items: [
        { button_id: "1", building_number: "1階", image_url: "src/assets/Toilet_icon_blue.png", },
        { button_id: "2", building_number: "2階", image_url: "src/assets/Toilet_icon_blue.png" },
        { button_id: "3", building_number: "3階", image_url: "src/assets/Toilet_icon_blue.png" },
        { button_id: "4", building_number: "4階", image_url: "src/assets/Toilet_icon_blue.png" },
        { button_id: "5", building_number: "5階", image_url: "src/assets/Toilet_icon_blue.png" },
        { button_id: "6", building_number: "6階", image_url: "src/assets/Toilet_icon_blue.png" }
    ],
    //詳細データ
    Toilet_table_items_detail: [
        { building_number_detail: "1-1", image_url: "src/assets/Toilet_icon_pink.png" },
        { building_number_detail: "1-2", image_url: "src/assets/Toilet_icon_pink.png" },
        { building_number_detail: "1-3", image_url: "src/assets/Toilet_icon_pink.png" },
        { building_number_detail: "1-4", image_url: "src/assets/Toilet_icon_blue.png" },
        { building_number_detail: "1-5", image_url: "src/assets/Toilet_icon_blue.png" },
        { building_number_detail: "1-6", image_url: "src/assets/Toilet_icon_blue.png" }
    ],

    Buildings: [
        { building_name: "1号館" },
        { building_name: "2号館" },
        { building_name: "3号館" },
    ]
})
