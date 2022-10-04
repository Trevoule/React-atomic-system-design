import React from 'react';
import { Spacing } from '@ds.e/foundation';
interface Props {
    space?: keyof typeof Spacing;
    left?: boolean;
    right?: boolean;
    top?: boolean;
    bottom?: boolean;
}
declare const Margin: React.FC<Props>;
export default Margin;
