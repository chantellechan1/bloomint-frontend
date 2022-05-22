export interface Plant {
    plant_id: number,
    plant_name: string,
    created_at: string
}

export interface plantType {
    created_at: string,
    id: number,
    max_temp: number,
    min_temp: number,
    name: string,
    num_owned: number,
    sunlight: string,
    water_frequency: number
}

export interface PlantImage {
    image_id: number,
    image_data: string // is a base64 encoded string representation of the image
}