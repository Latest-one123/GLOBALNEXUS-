import SearchBar from '../SearchBar';

export default function SearchBarExample() {
  return (
    <div className="p-4">
      <SearchBar onSearch={(query) => console.log('Search query:', query)} />
    </div>
  );
}