
import React from 'react';
import { useChannel, useAddonState } from '@storybook/api';
import { SyntaxHighlighter } from '@storybook/components';

import { ADDON_ID, EVENTS } from '../constants';
import { CoverageDetail } from '../types';
import { lineCoverage } from '../utils';

interface DetailPanelProps {
  detail: CoverageDetail;
}

const DetailPanel: React.FC<DetailPanelProps> = ({ detail }) => {
  if (!(detail.source && detail.item)) {
    return <div>No coverage set</div>;
  }

  const lineToMissing = lineCoverage(detail.item);
  const lineProps = (lineNumber: number) =>
    lineToMissing[lineNumber] ? { style: { backgroundColor: '#ffcccc', borderLeft: '5px solid #f85151' } } : { style: { borderLeft: '5px solid #95de95' } };
  return (
    <SyntaxHighlighter
      language="jsx"
      showLineNumbers
      // @ts-ignore
      wrapLines
      // @ts-ignore
      lineProps={lineProps}
      format={false}
      copyable={false}
      padded
    >
      {detail.source}
    </SyntaxHighlighter>
  );
};

export const CoveragePanel: React.VFC = () => {
  const [coverageDetail, setCoverageDetail] = useAddonState<CoverageDetail>(ADDON_ID, null);

  useChannel({
    [EVENTS.COVERAGE_DETAIL]: (detail: CoverageDetail) => setCoverageDetail(detail),
  });

  return coverageDetail ? <DetailPanel detail={coverageDetail} /> : <div>No coverage</div>;
};