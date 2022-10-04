import React from 'react';
import { Spacing } from '@ds.e/foundation';
interface Props {
    hexCode: string;
    width?: keyof typeof Spacing;
    height?: keyof typeof Spacing;
}
declare const Color: React.FC<Props>;
export default Color;
