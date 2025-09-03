export const generateAiPrompt = (
    teamHome,
    teamAway,
    lastMatchesHome,
    rateHome,
    strengthsHome,
    weaknessesHome,
    playStyleHome,
    lastMatchesAway,
    rateAway,
    strengthsAway,
    weaknessesAway,
    playStyleAway,
    lastMatchesH2h,
    description,
    oddsAll,
    preview
) => {
    return `
Проанализируй все предоставленые данные и Выбери лучшую ставку на матч между командами ${teamHome} и ${teamAway}.
Больше всего учитывай экспертыне мнения. Бери каждую ставку и сверяй с экспертными мнениями, чем больше экспертных мнений совпадают с сюжетом ставки, тем лучше ставка. Остальные данные используй после анализа экспертных мнений
 для более точного прогнозирования:

**1. Анализ формы команд:**
- **Для команды ${teamHome}:**
  - Последние 5 матчей: ${lastMatchesHome}
  - Рейтинг: ${rateHome}
  - Сильные стороны: ${strengthsHome}
  - Слабые стороны: ${weaknessesHome}
  - Стиль игры: ${playStyleHome}
- **${teamAway}:**
  - Последние 5 матчей: ${lastMatchesAway}
  - Рейтинг: ${rateAway}
  - Сильные стороны: ${strengthsAway}
  - Слабые стороны: ${weaknessesAway}
  - Стиль игры: ${playStyleAway}

**2. История личных встреч:** ${lastMatchesH2h}

**3. Мнения экспертов:** ${description}

**4. Коэффициенты букмекеров:** ${oddsAll}

**На основе этих данных предложи рекомендацию по наиболее вероятной и обоснованной ставке на этот матч. Предложи несколько вариантов ставок с объяснением (например, исход матча, тотал голов, фора, комбинированные ставки и т.д.).**
`;
};