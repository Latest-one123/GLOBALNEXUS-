import CategoryFilter from '../CategoryFilter';

export default function CategoryFilterExample() {
  return (
    <CategoryFilter onCategoryChange={(category) => console.log('Category changed to:', category)} />
  );
}