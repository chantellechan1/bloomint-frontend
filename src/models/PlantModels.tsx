/**
 * User Plant Model
 */
export interface UserPlant {
  id?: number; // id of individual user plant
  planttype_id: number; // id of plant type
  plant_name: string;
  created_at: string;
  purchased_at?: string;
  notes?: string;
  most_recent_image?: PlantImage | DefaultPlantImage;
}

export interface PlantType {
  created_at: string;
  id: number; // id of plant type
  max_temp: number;
  min_temp: number;
  name: string;
  num_owned: number;
  sunlight: string;
  water_frequency: number;
}

export interface PlantImage {
  image_id: number;
  user_plant_id: number;
  image_data: string; // is a base64 encoded string representation of the image
}

export interface DefaultPlantImage {
  image_data: string;
}
