import { ItemDto } from '../models/dto/item.dto';
import { Item } from '../models/interfaces/item.interface';

export function mapItemToDto(item: Item): ItemDto {
  return {
    id: item.id,
    city: item.city,
    color: item.color,
    end_date: item.endDate,
    price: item.price,
    start_date: item.startDate,
    status: item.status
  };
}

export function mapDtoToItem(dto: ItemDto): Item {
  return {
    id: dto.id,
    city: dto.city,
    color: dto.color,
    endDate: dto.end_date,
    price: dto.price,
    startDate: dto.start_date,
    status: dto.status
  };
}

export function createLocalDate(stringDate: string | Date) {
  const dateUTC = new Date(stringDate);
  return new Date(dateUTC.getTime() + dateUTC.getTimezoneOffset() * 60000);
}
