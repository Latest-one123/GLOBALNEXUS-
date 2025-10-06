import LanguageToggle from '../LanguageToggle';

export default function LanguageToggleExample() {
  return (
    <div className="p-4">
      <LanguageToggle onLanguageChange={(lang) => console.log('Language changed to:', lang)} />
    </div>
  );
}