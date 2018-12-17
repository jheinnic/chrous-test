import {Data, ParamMap} from '@angular/router';

export namespace RouterStateModels
{
  export interface RouterStateUrl
  {
    url: string;
    queryParamMap: ParamMap;
    paramMap: ParamMap;
    data: Data;
  }

  export const initialState: RouterStateUrl = {
    url: '',
    // queryParams: null,
    // params: null,
    queryParamMap: null,
    paramMap: null,
    data: null
  };
}
