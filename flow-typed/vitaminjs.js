//  @flow
import type { React$Component, React$StatelessFunctionalComponent } from 'react';

type styleType = { [string]: string };
type WithStyleConnector<P> = {
    (component: React$StatelessFunctionalComponent<P>): Class<React$Component<P>>,
    <Def, St>(component: Class<React$Component<Def, P, St>>): Class<React$Component<Def, P, St>>,
};
declare module 'vitaminjs' {
    declare export function withStyles<P>(style: styleType): WithStyleConnector<P>;
}
