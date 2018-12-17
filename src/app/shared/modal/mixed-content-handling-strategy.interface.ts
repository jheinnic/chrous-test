export enum DualStrategyType
{
  NeitherFlexStrategy = 'NeitherFlexStrategy',
  OneFixedOneFlexStrategy = 'OneFixedOneFlex',
  BothFlexStrategy = 'BothFlexStrategy'
}

export interface MixedContentHandlingStrategy
{
  type: DualStrategyType;

  orientation: 'row' | 'column';

  firstAlongAxis: 'fixed' | 'scrolling';

  justifyType: 'center' | 'start' | 'end' | 'stretch' | 'baseline';
}

export interface NeitherFlexStrategy extends MixedContentHandlingStrategy
{
  type: DualStrategyType.NeitherFlexStrategy;

  staticSize: number;

  scrollSize: number;

  alignType: 'center' | 'start' | 'end';
}

export interface OneFixedOneFlexStrategy extends MixedContentHandlingStrategy
{
  type: DualStrategyType.OneFixedOneFlexStrategy;

  flexibleChoice: 'fixed' | 'scrolling'

  fixedSize: string;
}

export interface BothFlexStrategy extends MixedContentHandlingStrategy
{
  type: DualStrategyType.BothFlexStrategy;

  fixedBasis?: string;

  alignFixed: 'center' | 'start' | 'end' | 'stretch';

  scrollBasis?: string;

  alignScroll?: 'center' | 'start' | 'end' | 'stretch';
}
