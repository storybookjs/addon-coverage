export interface Start {
  line: number;
  column: number;
}

export interface End {
  line: number;
  column: number;
}

export interface CodeLocation {
  line: number;
  column: number;
}

export interface Location {
  start: CodeLocation;
  end: CodeLocation;
}
export interface FunctionCoverage {
  name: string;
  decl: Location;
  loc: Location;
  line: number;
}

export interface Branch {
  loc: Location;
  // expression types like 'cond-expr' and 'binary-expr'
  type: string;
  locations: Location[];
  line: number;
}

export interface CoverageItem {
  path: string;
  statementMap: Record<string, Location>;
  fnMap: Record<string, FunctionCoverage>;
  branchMap: Record<string, Branch>;
  s: Record<string, number>;
  f: Record<string, number>;
  b: Record<string, number[]>;
  _coverageSchema: string;
  hash: string;
}

export interface CoverageDetail {
  source: string;
  item: CoverageItem;
}
