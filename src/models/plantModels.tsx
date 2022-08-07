/**
 * User Plant Model
 */
export interface Plant {
    plant_id: number,
    plant_name: string,
    created_at: string,
    purchased_at?: string
    notes?: string,
    user_id?: number
    most_recent_image?: PlantImage | DefaultPlantImage
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

/**
 * join type with all properties of plant (userPlant) and plantType
 */
export interface individualPlant extends Plant, plantType { }

export interface PlantImage {
    image_id: number,
    user_plant_id: number,
    image_data: string // is a base64 encoded string representation of the image
}

export interface DefaultPlantImage {
    image_data: string
}