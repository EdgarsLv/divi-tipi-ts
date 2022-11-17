/* eslint-disable @typescript-eslint/ban-ts-comment */
import TimeAgo from 'react-timeago';
// @ts-ignorets-
import latStrings from 'react-timeago/lib/language-strings/lv';
// @ts-ignorets-
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

const formatter = buildFormatter(latStrings);

function ReactTimeAgo({ date }: { date: string }) {
  return <TimeAgo date={new Date(date)} formatter={formatter} />;
}

export default ReactTimeAgo;
