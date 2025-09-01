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
Проанализируй все предоставленые данные и сформируй прогноз на матч между командами ${teamHome} и ${teamAway}. Учти следующие данные так же проведи все возможные рассчеты для более точного прогнозирования:

**1. Общая информация о матче:**
- Превью: ${preview}

**2. Анализ формы команд:**
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

**5. История личных встреч:** ${lastMatchesH2h}

**7. Мнения экспертов:** ${description}

**9. Коэффициенты букмекеров:** ${oddsAll}

**На основе этих данных предложи рекомендацию по наиболее вероятной и обоснованной ставке на этот матч. Предложи несколько вариантов ставок с объяснением (например, исход матча, тотал голов, фора, комбинированные ставки и т.д.).**
`;
};