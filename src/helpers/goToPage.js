import BusEvents from '@/BusEvents';

export default function goToPage(namePage, paramPage) {
  BusEvents.$emit('goToPage', namePage, paramPage);
}
