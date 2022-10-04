import React from 'react';
import { FontSize } from '@ds.e/foundation';
interface Props {
    size?: keyof typeof FontSize;
}
declare const Text: React.FC<Props>;
export default Text;
