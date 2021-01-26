// import original module declaration
import "styled-components";
import { CSSObject } from "styled-components";

// and extend it
declare module "styled-components" {
  export interface DefaultTheme {
    blackColor: CSSObject;
    greyColor: CSSObject;
    darkGreyColor: CSSObject;
    lightGreyColor: CSSObject;
    redColor: CSSObject;
    blueColor: CSSObject;
    darkBlueColor: CSSObject;
  }
}
