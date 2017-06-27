import { Component } from 'react';
import { withStyles } from 'vitaminjs';
import classnames from 'classnames';
import Prismic from 'prismic.io';
import { pipe, map } from 'ramda';
import { point } from '@turf/helpers';

import s from './style.css';
import Map from './Map';
import Modale from './Modale';
import Details from './Details';
import Post from './Post';
import { getStepLines } from './data';


const getSleepingPoints = () =>
    Prismic.api('http://vagalam.prismic.io/api')
        .then(api => api.query(
            Prismic.Predicates.at('document.type', 'sleep_location'),
            { orderings : '[my.sleep_location.day_number]', pageSize: 50 },
        ))
        .then(pipe(
            response => response.results,
            map(result => {
                const { longitude, latitude } = result.data['sleep_location.location'].value;
                return point([longitude, latitude]);
            }),
        ))
;

class Trip extends Component {
    constructor(props) {
        super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
        this.state = { showPost: false }
    }
    componentDidMount() {
        getSleepingPoints().then(sleepingPoints => this.setState({
            stepLines: getStepLines(sleepingPoints),
        }));
    }
    handleKeyDown(e) {
        if (e.key === ' ') {
            this.setState(({ showPost }) => ({ showPost: !showPost }));
        }
    }
    handleModalClose() {
        this.setState({ showPost: false });
    }
    render() {
        return <div className={s.layout} onKeyDown={this.handleKeyDown} >
            <Modale isOpen={this.state.showPost} onClose={this.handleModalClose} >
                <Post
                    title="A new beginning"
                    date={new Date(2017, 6, 1)}
                    content={`
<p>Partout s'étalait, se répandait, s'ébaudissait le peuple en vacances. C'était une de ces solennités sur lesquelles, pendant un long temps, comptent les saltimbanques, les faiseurs de tours, les montreurs d'animaux et les boutiquiers ambulants, pour compenser les mauvais temps de l'année.</p>
<p>En ces jours-là il me semble que le peuple oublie tout, la douleur et le travail ; il devient pareil aux enfants. Pour les petits c'est un jour de congé, c'est l'horreur de l'école renvoyée à vingt-quatre heures. Pour les grands c'est un armistice conclu avec les puissances malfaisantes de la vie, un répit dans la contention et la lutte universelles.</p>
<p>L'homme du monde lui-même et l'homme occupé de travaux spirituels échappent difficilement à l'influence de ce jubilé populaire. Ils absorbent, sans le vouloir, leur part de cette atmosphère d'insouciance. Pour moi, je ne manque jamais, en vrai Parisien, de passer la revue de toutes les baraques qui se pavanent à ces époques solennelles.</p>
<p>Elles se faisaient en vérité, une concurrence formidable : elles piaillaient, beuglaient, hurlaient. C'était un mélange de cris, de détonations de cuivre et d'explosions de fusées. Les queues-rouges et les Jocrisses convulsaient les traits de leurs visages basanés, racornis par le vent, la pluie et le soleil ; ils lançaient, avec l'aplomb des comédiens sûrs de leurs effets, des bons mots et des plaisanteries d'un comique solide et lourd comme celui de Molière. Les Hercules, fiers de l'énormité de leurs membres, sans front et sans crâne, comme les orangs-outangs, se prélassaient majestueusement sous les maillots lavés la veille pour la circonstance. Les danseuses, belles comme des fées ou des princesses, sautaient et cabriolaient sous le feu des lanternes qui remplissaient leurs jupes d'étincelles.</p>
<p>Tout n'était que lumière, poussière, cris, joie, tumulte ; les uns dépensaient, les autres gagnaient, les uns et les autres également joyeux. Les enfants se suspendaient aux jupons de leurs mères pour obtenir quelque bâton de sucre, ou montaient sur les épaules de leurs pères pour mieux voir un escamoteur éblouissant comme un dieu. Et partout circulait, dominant tous les parfums, une odeur de friture qui était comme l'encens de cette fête.</p>
<p>Au bout, à l'extrême bout de la rangée de baraques, comme si, honteux, il s'était exilé lui-même de toutes ces splendeurs, je vis un pauvre saltimbanque, voûté, caduc, décrépit, une ruine d'homme, adossé contre un des poteaux de sa cahute ; une cahute plus misérable que celle du sauvage le plus abruti, et dont deux bouts de chandelles, coulants et fumants, éclairaient trop bien encore la détresse.</p>
<p>Partout la joie, le gain, la débauche ; partout la certitude du pain pour les lendemains ; partout l'explosion frénétique de la vitalité. Ici la misère absolue, la misère affublée, pour comble d'horreur, de haillons comiques, où la nécessité, bien plus que l'art, avait introduit le contraste. Il ne riait pas, le misérable ! Il ne pleurait pas, il ne dansait pas, il ne gesticulait pas, il ne criait pas ; il ne chantait aucune chanson, ni gaie, ni lamentable, il n'implorait pas. Il était muet et immobile. Il avait renoncé, il avait abdiqué. Sa destinée était faite.</p>
<p>Mais quel regard profond, inoubliable, il promenait sur la foule et les lumières, dont le flot mouvant s'arrêtait à quelques pas de sa répulsive misère ! Je sentis ma gorge serrée par la main terrible de l'hystérie, et il me sembla que mes regards étaient offusqués par ces larmes rebelles qui ne veulent pas tomber.</p>
<p>Que faire ? A quoi bon demander à l'infortuné quelle curiosité, quelle merveille il avait à montrer dans ces ténèbres puantes, derrière son rideau déchiqueté ? En vérité, je n'osais; et dût la raison de ma timidité vous faire rire, j'avouerai que je craignais de l'humilier. Enfin, je venais de me résoudre à déposer en passant quelque argent sur une de ses planches, espérant qu'il devinerait mon intention, quand un grand reflux de peuple, causé par je ne sais quel trouble, m'entraîna loin de lui.</p>
<p>Et, m'en retournant, obsédé par cette vision, je cherchai à analyser ma soudaine douleur, et je me dis : Je viens de voir l'image du vieil homme de lettres qui a survécu à la génération dont il fut le brillant amuseur ; du vieux poète sans amis, sans famille, sans enfants, dégradé par sa misère et par l'ingratitude publique et dans la baraque de qui le monde oublieux ne veut plus entrer !</p>
`}
                    pictures={[
                        "https://vagalamapi.files.wordpress.com/2017/06/dscf3713.jpg?quality=80&strip=info&w=900",
                        "/assets/files/b2e24f6b7884a150397208cb09913252.jpg"
                    ]}
                />
            </Modale>
            <div className={classnames(s.map, { [s.zoom]: this.state.showPost }) } >
                <Map stepLines={this.state.stepLines} />
            </div>
            <Details />
        </div>
    } 
};

export default withStyles(s)(Trip);