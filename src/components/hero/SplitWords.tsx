interface Word {
  text: string;
  em?: boolean;
}

interface Break {
  br: true;
  className?: string;
}

type Item = Word | Break;

interface SplitWordsProps {
  words: Item[];
  startIndex?: number;
}

export function SplitWords({ words, startIndex = 0 }: SplitWordsProps) {
  return (
    <>
      {words.map((item, i) => {
        if ('br' in item) {
          return (
            <br
              key={`${startIndex}-${i}`}
              className={item.className}
            />
          );
        }
        const delay = (startIndex + i) * 38;
        const inner = item.em ? <em>{item.text}</em> : item.text;
        return (
          <span
            key={`${startIndex}-${i}`}
            className="hero-word is-visible inline-block"
            aria-hidden="true"
            style={{ animationDelay: `${delay}ms` }}
          >
            {inner}
            {' '}
          </span>
        );
      })}
    </>
  );
}

export default SplitWords;