import { useTranslation } from 'react-i18next';
import lang from '../../assets/icons/lang.svg';
import FormSelect from '../FormSelector';
import { useEffect, useState, useCallback } from 'react';

const languageList = [
  { optionValue: 'en', optionName: 'English' },
  { optionValue: 'bl', optionName: 'Беларуская' },
];
interface Props {
  rowStart?: string;
}

export function LangSwitcher({ rowStart }: Props): JSX.Element {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(languageList[0].optionValue);

  const onClickLanguageChange = useCallback(
    (value: string) => {
      setSelectedLanguage(value);
      i18n.changeLanguage(value);
    },
    [i18n]
  );

  useEffect(() => {
    const language = i18n.language;
    onClickLanguageChange(language);
  }, [i18n, onClickLanguageChange]);

  return (
    <div className={`header__lang ml-2 flex items-center justify-center row-start-${rowStart}`}>
      <img className="h-8" src={lang} alt="" />
      <form className="form ml-2">
        <div className="form__section">
          <FormSelect
            isRequired={false}
            doValidate={false}
            inputValue={selectedLanguage}
            inputId="language"
            inputName="language"
            labelText=""
            onChangeCallback={onClickLanguageChange}
            selectDataSource={languageList}
          ></FormSelect>
        </div>
      </form>
    </div>
  );
}
