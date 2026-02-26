// ═══════════════════════════════════════════════
//  WordForge — Puzzle Engine & Trie Dictionary
// ═══════════════════════════════════════════════

'use strict';

// ── Embedded word list (curated 4000+ common English words) ──
// Compressed as a flat string array; real deployment would use a full 50k trie
const WORD_LIST_RAW = `
aba abs ace act add ads adz aft age ago aha aid aim air ala alb ale all alp alt amp and ant any ape apt arc are ark arm art ash ask asp ate auk awe awl axe aye azo
bad bag bah ban bar bat bay bed beg bel bet bib bid big bin bis bit boa bob bod bog boo bow box boy bra bub bud bug bum bun bur bus but buy bye
cab cad cam can cap car cat caw cay cob cod cog col con coo cop cot cow cox coy cry cub cue cup cur cut
dab dad dag dam dan dap daw day deb den dev dew did die dig dim din dip dis doc doe dog dol dom don dot dry dub duo dug dun duo dye
ear eat ebb eco edy egg ego eke eld elf elk elm els emu end eon era ere erg ern err eta eve ewe eye
fad fag fan far fat fax fay fed fee fen fer few fey fez fib fig fin fir fit fix fiz flu fly fob foe fog fop for fox fro fry fub fug fun fur
gab gad gag gal gap gar gas gay gel gem gen get gey gib gig gin gnu goa gob god goo got gum gun gut guy gym gyp
had hag hah ham han hap has hat haw hay hem hen her hes hew hex hey hic hid hie him hin hip his hit hob hod hog hon hop hot how hoy hub hue hug hui hum hun hut hyp
ice icy ids iff ilk ill imp ink inn ion ire irkism its ivy
jab jag jam jar jaw jay jee jet jeu jew jib jig jim job joe jog jot joy jug jun jus jut
kay kea ked keg ken kep ket key khi kid kin kip kir kit koa kob koi kop kor kos kue
lab lac lad lag lam lap lar las lat lav law lax lay lea led lee leg lei lek let leu lev lex ley lib lid lie lin lip lis lit lob log loo lop lot low lox lug lum luv lux lye
mac mad mae mag man map mar mas mat maw max may med meg mel mem men met mew mho mid mig mil mim min mir mis mix moa mob moc mod mog mom mon moo mop mor mot mow mud mug mum mun mus mut mux
nab nae nag nah nan nap naw nay neb nee net new nib nil nim nip nit nix nob nod nog noh nom non nor nos not now nub nun nus nut
oak oar oat oba obe obi oda odd ode ods off oft oho ohs oil oka oke old ole oma oms one ono ons ony opa ope ops opt ora orb orc ore ors ort ose oud our out ova owe owl own oxo oxy
pac pad pah pal pam pan pap par pas pat paw pax pay pea pec fed pee peg peh pen pep per pes pet pew phi pht pia pic pie pig pin pip pis pit piu pix ply poa pod poh poi pol pom poo pop pot pow pox pro pry psw pub pud pug pul pun pup pur pus put pya pye pyx
qat qis qua
rad rag rah rai raj ram ran rap ras rat raw rax ray reb red ref reg rei rem rep res ret rev rex rez rho ria rib rid rif rig rim rin rip rob roc rod roe rom rot row rub rue rug rum run rut rya rye
sac sad sae sag sal sap sar sat sau saw sax say sea sec see seg sei sel sen ser set sew sex sha she shh shy sib sim sin sip sir sis sit six ska ski sky sly sob sod sol son sop sos sot sow soy spa spy sri sty sub sue suk sum sun sup sur sus
tab tad tae tag taj tam tan tao tap tar tas tat tau tav taw tax tea ted tee teg tel ten tet tew the tho thy tic tie til tin tip tis tit tix tiz toe tog tom ton too top tor tot tow toy try tsk tub tug tui tun tup tut tux twa two tye tyg
udo ugh uke ulu umm ump ums uni uns upo ups urb urd urn urp use uta ute uts
vac van var vas vat vau vav vaw vee veg vet vex via vid vie vig vim vin vis voe vow vox vug vum
wab wad wae wag wan wap war was wat waw wax way web wed wee wen wet wey wha who why wig win wis wit wiz woe wok won woo wos wot wow wry wud wye wyn
xis xis
yad yag yah yak yam yap yar yaw yay yea yeh yen yes yet yew yin yip yob yod yok yom yon you yow yuk yum yup
zag zap zas zax zed zee zek zel zen zep zig zin zip zit zoa zoo zuz
abah abet able ably abut aces ache acid acme acne acre acts adds aged ager ages agin agog ague ahoy aide aids ails aims airs airy ajar akin alas alba albs alec alee ales alga alit aloe also alto alum amok amed amen amid amis ammo amps amut amyl ands anew ankh anon ante anti ants apex apis apps apse aqua arch arcs area ares aria arid aril arks arms army arts arty ashy askew atom atop aunt aura auto aver avid avow away awed awes awls awry axed axes axle ayin
baba babe baby bach back bade bags bail bait bake bald bale ball balm bams band bane bang bank bans barb bard bare bark barn bars base bash bask bass bast bate bath bats baud bawl bays bead beam bean bear beat beau beck beef been beep beer bees beet begs bell belt bend bent best beta bets bevy bias bice bide bieri bike bile bilk bill bind bins bird bise bite bits blab blad blam blat bled blew blip blog blot blow blue blur boar boas boat bobs bock bode body bogs bogy boils bola bold bole boll bolt bomb bond bone bong bonk bony boob book boom boon boor boot bore born boss both bout bowl bows boyo boys brad brag bran brat braw bray bred brew brig brim brink brit brow buck buds buff buhr bulb bulk bull bump buns bunk bunt buoy bura burb burd burg burl burn burp burr burs bury bush busk buss bust busy bute butt buys buzz byes byre byte
cafe cage cake calf call calm came camp cane cans cant cape caps card care cars cart case cash cask cast cave cavy cays cedi cell cent chad chap char chat chef chew chin chip chop chow chug chum cite city clad clan clap claw clay clef clip clod clog clop clot club clue coal coat coax cobb cobs cock code coed coff coif coil coin cold cole colt coma comb come comp cone conk cook cool coop coot cope cops copy cord core cork corn cost cozy crab crag cram crap craw crew crib crop crow crud crux cube cubs cuds cuff cull cult curb curd cure curl curt cusp cute cuts cyan cyst czar
dabs dace dada dads daft dais dale dame damp dams dang dank dare dark dart dash data date dawn days daze dead deaf deal dean dear debt deck deco deed deem deep deer deft defy dell demo dens dent deny desk deva dews dial dice dick died dies diet digs dike dill dime dims dine ding dink dint dire dirt disc dish disk dits diva dive dodo doer dogs doit dole doll dolt dome done dong dons doom door dopy dore dork dorm dory dose dote doth dots dour dove down doze drab drag dram draw dray drew drip drop drab drug drum dual duck dude duel dues duet dugs duke dull duly dumb dump dune dung dunk duns duos dupe dusk dust duty dyer dyes dyne
each earl earn ears ease east easy eats eave ebbs echo eddy edgy edit eels eggs eide eigh eiks eked ekes elan elds elms else emic emit emmy emus ends envy eons epic eras eras ered eres ergo ergs erne erns eros errs erst espy etch etna etui euro even ever eves evil ewer ewes exam exes exit expo eyas eyed eyes eyne eyra eyre
face fact fade fads fail fain fair fake fall fame fang fans fane farc fare farm faro fart fast fate faun faux fawn faze fear feat feds feed feel fees feet fell felt fend fern fess fete feud fiat fibs fief fife figo figs file fill film find fine fins fire firm fish fist fits five fizz flag flap flat flaw flax flea fled flee flew flex flip flit flog flop flow flue flux foal foam fobs foci foes fogs fogy foil fold folk fond font food fool foot ford fore fork form fort foul four fowl foxy frab frag fray free fret frig frog from frow fuel full fume fund funk furl furn fury fuse fuss fuzz fyke
gabs gads gaff gage gags gain gait gala gale gall gals game gamp gams gang gaol gape gaps garb gare gash gasp gate gave gawp gaze gear gels gems gene gent germ gets gibe gift gigs gild gill gilt gimp gins gird girl girt gist give glad glee glen glib glim glob glow glue glum glut gnar gnat gnaw goad goal goat gobs gods goer goes gold golf gone gong good goof goon gore gory gosh gout gown grab grad gram gray gree grew grey grid grim grin grip grit grog grot grub guff gulf gull gulp gums gunk guns guru gush gust guts guys gybe gyms gypo gyre gyri gyro
hack hadj haft hags haik hail hair hake hale hall halt hams hand hang hank haps hard hare hark harm harp hart hash hasp hate hath hats haul have hawk haws hays haze hazy head heal heap hear heat heck heed heel heft heir held helm help hems hens herb herd here hero hern hers hewn hews hick hide hied hies high hike hill hilt hind hint hips hire hiss hist hits hive hoax hobo hobs hock hods hoed hoer hoes hogs hold hole holm holt holy home hone honk hood hoof hook hoop hoot hope hops horn hose host hots hour hove howl hubs hued hues huff huge hugs hula hull hump hums hung hunk hunt hurl hurt hush husk huts hymn hype hypo
iamb ibex ibis iced icer ices icon idea idle idly idol idyl iffy iglu ikon ills illy imam imid inky inns inro into ions iota iris iron isba isle isms itch item ivie ivory iwis ixia
jabs jack jade jagg jail jake jamb jamie jams jane jars jato jauk java jaws jays jazz jean jeep jeer jell jerk jess jest jete jets jibe jibs jiff jiga jigs jill jilt jink jinn jinx jive jobs jock joes jogs john join joke jolt josh joss jota jots jowl joys juba judo judy jugs juju juke jule jump junk jupe jura jury just jute juts
kale kame kana kane kans kaph karn kart kata kats kava kaws kays keas keck keel keen keep kegs kelp kemp keno kens kept kerb kerf kern keto keys khat kibe kick kids kief kier kike kill kiln kilo kilt kina kind kine king kink kino kins kips kirk kiss kist kite kith kits kiva kiwi knap knee knew knit knob knot know koan koas kohl kois kola kolo kons kook koph kops kora kore koto kowt kris kudo kueh kues kufi kuna kune kuru kvas kyat kyle kyte
labs lace lack lads lady lags laic laid lain lair lake laky lall lama lamb lame lamp lams land lane lank laps lard lark lase lass last late lath laud lava lavs lawn laws lays laze lead leaf leak lean leap leas leat lech leed leek leer lees leet left legs leis leke leks leme lend leno lens lent lept lest lets leva leve levy lewd leys liar lias lice lick lido lids lied lief lien lier lies lieu life lift like lilo lilt lily lima limb lime limn limp limy line ling link lino lins lint liny lion lipa lips lisp list lite lits live load loaf loam loan lobe lobi lobs loca loch loci lock loco lode loft loge logo logs logy loid loin loll lone long loon loop loos loot lope lops lord lore lorn lory lose loss lost lota loth loti loto lots loud loup lour lout love lowe lown lows lual lube luce luck lucy ludo lues luff luge lugs lull lulu lume lump lums luna lune lung lunt luny lure luring lurk lush lust lute luvs luxe lynx lyre lyse
mace mach mack macs made mads mage magi mags maid mail maim main make maki mako male mall malm malt mama mams mane mano mans many maps mara marc mare mark marl mars mart mash mask mass mast mate mats matt maud maul maut mawm mawn maws maxy maya mayo mays maze mazy mead meal mean meat meds meed meek meet mein mela meld mell mels melt memo mems mend meno menu meow merc mere mesh mess meta mete meth mewl mews mezz mhos mica mice mick midi mids mien miff migg migs mike mild mile milk mill milo mils milt mime mina mind mine ming mini mink mino mint minx mira mire miri mirk miry miso miss mist mite mitt mity mixt moan moas moat mobs mock mocs mode modi mods moer moes mofp mogs moil mojo moke mola mold mole moll molt momo moms mona mono mons mony mood mooi mook moon moor moos moot mope mops mopy mora more morn mors mort mosh moss most mote moth mott moue moul mown mows mozo much muck muds muff mugg mugs muid muir mule mull mumm mump mums mumu mung muni muns muon mura mure murk murr muse mush musk muso muss must mute muti muts mutt muzz myna myth
naan nabe nabs nada naff naga nags naif nail name nams nana nans nape naps narc nard nary nave navy nays neap near neat nebs neck need neem neep neet neif nene neon neps nerd nerk nesh ness nest nets nett neuk neve nevi news newt next nibs nice nick nide nidi nido nids nied nies niff nigh nill nils nimb nine nisi nite nits nixe nixy noah nobs nock node nodi nods noel noes nogg nogo nogi nogs noil noir nolo noma nome noms nona none nong noni noon noop noos nora nork norm nose nosh nosy nota note noth noun nous nova nowl nown nows nowt nubs nude nuke null numb nuns nurd nurl nuts
oafs oaks oars oath oats obey obis oboe obol ocas odds odea odes odic odor odyl ofay offs ogam ogee ogle ogre ohed ohem ohia ohms oils oily okay okas okee oker okes okra olds olea oled oles olio olla olms oman omen omer omit once ones only onos onto onus onyx oops oots ooze oozy opal opas oped open opes opts opus oral orbs orca orcs ords ores orgy orle orra orts oryx osar oses ossa otic otto ouch oudh ouds ouff ouks ould ouma oupa ouph ours oust outo outs ouzo oval oven over ovum owed owes owls owly owns owse owts oxes oxid oxim oyer oyes oyez
pace pack pacs pact pads page paid paik pail pain pair pale pall palm palp pals pams pane pang pans pant papa paps para pard pare park parr pars part pass past pate path pats paty pauk paul pave pawk pawl pawn paws pays peag peak peal pean pear peas peat pech peck pecs peds peed peek peel peen peep peer pees pegs pehs pein peke pele pelf pell pelt pend pene peni penk pens pent peon pepo peps pery pert peso pest pets pewy pews phew phis phiz phon phos phot pial pian pias pica pice pick pics pied pier pies piet pigs pika pike piki pile pili pill pily pima pimp pina pine ping pink pins pint piny pion pipa pipe pips pipy pirn pirs pise pish piso piss pita pith pits pity pixy pize plan plat play plea pleb pled plew plex plie plod plop plot plow ploy plug plum plus pock poco pods poem poet pogo pogy pois poke poky pole poll polo poly pome pomo pomp pond pone pong pons pony poof pooh pool poon poop poor poos poot pope pops pore pork porn port pose posh post posy pots pott pouf pour pout pows poxy prad pram prao prat prau pray pree prep pres prey prez prig prim proa prod prof prog prom prop prow prys psis psuh pube pubs puce puck puds pudu puff pugs puja puke pula pule puli pull pulp puls puma pump puns punt puny pupa pups pury pure puri purl purr purs push puss puts putz pyas pyes pyic pyin pyne pyre pyro
qaid qats qoph quad quag quai quat quay quey quid quin quip quit quiz quod quon quop
race rack racy rads raff raft raga rage ragg ragi rags raia raid rail rain rais raja rake raki raku rale rami ramp rams rana rand rane rang rani rank rant rape raps rapt rare rase rash rasp rata rate rath rato rats raun rave rawn raws raxy raya rays raze razz read real ream reap rear rebs reck recs redd rede redo reds reed reef reek reel reen rees refi refs reft regs rehs reif rein reis rely rems rend reno rent reny reos repo reps rept resh rest rete rets revs rhea rhos rhumb rial rias ribs rice rich rick ride rids riel rife riff rift rigg rigs rile rill rima rime rims rimy rind ring rink rins riot ripe rips rise risk rist rite rits rive riza road roam roan roar robe robs roch rock rocs rode rods roed roes roil roin roji roke rokp roks role roll roms romp rone rong ront rood roof rook room roon roop roos root rope ropy rory rose rosy rota rote roti rotl roto rots roue roum roun roup rout roux rove rows rowt rube rubs ruby ruck rudd rude ruds rued ruer rues ruff ruga rugs ruin rule ruly rume rump rums rune rung runs runt rurb ruse rush rusk rust ruth ruts ryal ryas ryes ryke rynd ryot
saba sabe sabs sack sacs sade sadi sado sads safe saga sage sago sags sagy said sail sain sake saki sale sall salp sals salt same samp sand sane sang sank sans saps sard sari sark sash sass sate sati saul save sawn saws saxy says scab scad scag scam scan scar scat scau scaw scow scry scud scum scut seal seam sean sear seas seat secs sect seed seek seel seem seen seep seer sees sego segs seif seis self sell sels semi send sene sent sept sera sere serf sers seta sets sett sewn sews sext sexy shad shag shah sham shan shat shaw shay shea shed shes shet shew shid shim shin ship shir shit shri shua shul shun shut shwa sial sibs sice sick sics side sift sigh sild silk sill silo silt sima simp sims sine sing sinh sink sins sipe sips sire siri sirs site sits situ size sizy skas skat skaw skee skeg skel sken skep skew skid skie skim skin skip skis skit skua skug skyf slab slag slam slap slat slaw slay sled slee slew slid slim slip slit slob sloe slog slop slot slow slub slue slug slum slur slut smew smit smog smug smut snag snap snaw sned snee snib snig snip snit snob snog snot snow snub snug snye soak soar soas soba sobs soca sock soda sods sofa soft soke sola sold sole soli solo sols soma some somy sone song sons soon soop soot soph sops sora sorb sord sore sori sorn sort sory soth souk soul soup sour sous sowp sown sows soya soys spad spae spam span spar spas spat spaw spay spec sped spew spie spin spit spiv spot spry spud spue spun spur sris stab stag star stay sted stem sten step stet stew stey stir stoa stob stop stot stow stub stud stum stun stye styl suave suba subs such suck sudd suds sued suer sues suet sugh suit soke sula sulk sulu sumi sumo sump sums sung sunk sunn suns supe sups suqs surd sure surf suss swab swad swag swam swan swap swat sway swee swig swim swiz swob swop swot swum syce syke syli sync syne syph
tabi tabs tabu tace tach tack taco tact tads taed tael tags tahr taig tail tain tait taka take tala talc tale tali talk tall tame tamp tams tang tanh tank tans taos tapa tape taps tapu tara tare tarn taro tarp tars tart tate tats taty taup taus taut tava tavs tawa taws taxy taxi tead teak teal team tear teas teat tech teds tedy teed teel teem teen tees teff tegg tegs tegu tehr teil tela teld tele tell tels telt temp tene tens tent tepa tere term tern terp teth tetr tewl tews text thae than thar that thaw thea thee them then chew they thig thin thir this thoa thon thoo thou thro thru thud thug thus thuy tian tiar tice tick tics tide tidy tied tier ties tiff tift tige tigs tike tiki tile till tils tilt time tine ting tink tins tint tiny tipi tips tipt tire tirl tirr tite titi tits tivy toad toat tobe tobs Toby tock toco tocs todd tody toea toed toes toff toft tofu toga toge togo togs toil toit toke toko tola told tole toll tolt tolu tomb tome tomo toms tone tong tonk tons tony took tool toon toot tope toph topi topo tops tora torc tore tori torn toro torr tors tort tory tosa tosh toss tost tote tots touk toun tour tout town tows towy toyo toys trad tram trap trat traw tray tree tref trek trep tres tret trew trey trib trie trig trim trin trio trip trit trod trog tron trop trot trow troy true trug trun trye trys tsar tuba tube tubs tuch tuck tufa tuff tuft tugs tuii tuis tule tump tuna tune tung tuni tuns tups turd turf turk turn turp tush tusk tuts tutu twae twal twas twat tway twee twig twin twit twos tyde tyed tyee tyer tyes tygs tyke tyne type typo typp typy tyre tyro tyte
uber uchu udal udon udos ughs ugly ukes ulan ulna ulus umma umms umph umps unai unau unbe unci unco unde undo undy uned unfit unio unit unto unup upas updo upon upos upsy urea urge uric urns urps ursa urus used user uses usps utas utes utis utus uvea uvula
vacs vaga vagi vail vain vair vale vamp vane vang vans vara vare vari vars vary vasa vase vast vats vatu vaus vavs vaws veal veep veer vees vega vego veil vein vela veld vena vend vent vera verb verd vert very vest veto vets vext vial vias vibe vice vide vids vied vier vies view viga vigs vile vill vims vina vine vino vins viny viol vips virl visa vise vita vite viva vive voes vogu void vole volt vote vows vrow vugg vugs
wabs wack wade wadi wads waes waff waft wage wags waif wail wain wair wait wake wale wali walk wall waly wame wand wane wang wank wans want wany waps ward ware wark warm warn warp wars wart wary wash wasp wast wate wats watt waul waur wave wavy wawl waws waxy ways weak weal wean wear webs wede weds weed week weel ween weep weer wees weet weft weigh weir weld well welt wend went wept were wert west wets wham whap what whee whew whey whid whig whim whin whip whir whit whiz whoa whom whop whow whup whys wich wick wide wield wife wigs wild wile will wilt wily wince wind wine wing wink wino wins winy wipe wire wiry wise wish wisp wiss wist wite with wits wive woad woes woke wold wolf womb wonk wont wood woof wool woon woos wops word wore work worm worn wort wost wots wove wows wrap wren writ wuddy wuds wyes wyns
xray xyst
yack yads yaff yagi yags yaks yald yale yamn yams yang yank yapp yaps yard yare yark yarn yate yawl yawn yawp yaws yays yeah yean year yeas yech yeed yeel yeen yeep yeer yees yell yelp yelt yens yeps yerk yese yesh yest yeti yetu yeuk yews ygoe yids yike yill yips yird yirr yiti ylem yobs yock yode yodh yods yoga yogh yogi yoke yokl yoks yold yolk yomp yond yoni yook yoon yops yore york yorp yosh yous yowe yowl yown yowp yows yoyo yuan yuca yuch yuck yuga yuke yuko yuks yule yump yung yups yurt yutz ywis
zack zags zany zaps zarf zeal zebu zeda zeds zees zein zeks zels zens zero zest zeta zeze zhuz ziff zigs zila zill zinc zine zing zins zips ziti zits zizz zoas zobo zoea zoes zogo zoic zona zone zonk zoom zoon zoos zori zost zouk zulu zyme
abaft abase abash abate abbey abbot abhor abide abled abler ables abode abort about above abuse abyss ached aches acids acing acmes acned acres acrid acted actin actor acute adage adapt added adder adept adieu adios admit adobe adopt adore adorn adult aegis affix afire afoot after again agape agate aged agers agent agile aging aglow agony agree ahead aided aides ailed aimed aired aisle alarm album alder alert algae alias alibi alien align alike alive alkyl allay alley allot allow alloy aloft alone along aloof aloud alpha altar alter amass amaze amber amble amend amide amino amiss amity among ample amply amuse angel anger angle angry angst animal anise ankle annex annoy annul anode anvil aorta apart aphid aping apish apple apply apron apter aptitude aquarium arbor arced arch areas arena argot argue ardor arid arise armor aroma arose array arrow arson artsy ascot ashen ashes aside asked askew aspic assay aster astir atlas atoll atone attic audio audit auger augur aunts aural auric autos avail avant avert avian avoid await awake award aware awash awful awoke axial axiom axles axle azure
babes bacon badge badly baffle baggy baits baked baker bakes balds baled baler bales balls bally balms balmy banal bands bandy banes bangs banjo banks banns barbs bards bared barer bares barge barks barky barns baron baser bases bashful basic basil basin basis basks basso basts batch bated bates baths baton batty bauds bawls bayed beach beads beady beams beamy beans beard bears beast beats beaux becks beech beefs beefy beeps beers beery beets befit began beget begin begot begun beige being belay belch belie belle bells belly below belts bench bends bendy bento bents beret berry berth beryl beset bests betel biddy bidet bides bight bigot bikes biles bilks bills billy binds binge bingo biped birch birds birth bison bitch bites bitty blabs black blade blams bland blank blare blast blaze bleak bleat bleed blend blent bless blimp blind blips bliss blitz bloat blobs block blogs blond blood bloom blops blows blowy blued bluer blues bluff blunt blurs blush board boast boats bobbi bobby bodes bogey bogie bogle bogus boils bolas bolds boles bolus bombs bonds boned boner bones boney bongo bongs bonks bonny bonus booby booed books booms boons boors boost booth boots booty booze boozy borax bored borer bores boric borne boron bosky bosom bossy botch bough bound bouts bowed bowie bowls boxca boxed boxer boxes brace bract brads brags braid brain brake brand brash brass brats brave bravo brawl brawn brays bread break bream breed brews briar bribe brick bride brief brier brigs brill brim brink brisk broad broil broke brood brook broom broth brown brows bruin bruit brunt brush brute bucks buddy budge buffs buggy bugle build built bulbs bulge bulky bulls bully bumps bumpy bunch bungs bunks bunny bunts buoys burbs burly burns burnt burps burrs burst butch butte butts buxom buyer bytes
cabal cabin cable cacao cache cacti caddy cadet cadge cages cagey cakes cakey calfs calla calls calms calve camel cameo camps campy canal candy canes canny canoe canon canto caper capes cards cared cares caret cargo carny carol carps carry carts carve cases casks caste casts catch cater catty caulk cause caves cavil cease cedar cedes cells cello cents ceres chafe chaff chain chair chalk champ chant chaos chaps chard charm chars chart chase chasm chats cheap cheat check cheek cheep cheer chefs chess chest chews chewy chick chide chief child chili chill chime chimp china chink chips chirp choir chops chord chore chose chow chugs chums chunk churn chute cider cigar cinch circa cited cites civet civic civil clack clads claim clamp clams clang clank clans claps clash clasp class claws clays clean clear cleat clefs clerk clews click cliff climb cling clink clips cloak clock clods clogs clomp clone clops close cloth cloud clout clove clown clubs cluck clues clump clung clunk coach coals coast coats cobra cocks cocky cocoa codes coeds coifs coils coins colds coles colly colon color colts combs comes comet comic comma comps conch cones coney congs conic conks cooed cooks cools coops coots coped coper copes copra copy coral cords cored cores corks corky corns corny corps costs couch cough could count coupe coups court coven cover covet covey cows coyly crabs crack craft crags cramp craps crash crass crate crave craws crawl craze crazy creak cream credo creed creek creel creep crepe crept cress crest crews cribs cried cries crime crimp crisp croak crock croft crone crony crook croon crops cross croup crowd crown crows crude cruel cruet crumb crura crush crust crypt cubes cubic cubit cuffs culks cults curbs curds cured cures curio curls curly curry curse curst curve curvy cushy cusps cutie cycle cynic cysts czars
daddy daily dairy daisy dales dames damns damps dance dandy dangs dares darks darts dashy dates datum daunt dawns dazes deads deafs deals deans dears death debar debit debts debug debut decal decay decks decor decoy decry deeds deems deeps deers defer deity delay delta delve demon demur denia dents depot depth derby desks detox deuce devil devon devot devolve dewed dials diary diced dices dicey dicks dicky didos diets digit dikes dills dilly dimes dimly diner dines dingo dings dinky dents diode dirge dirts dirty discs disco dish dishy disks ditch ditsy divan divas dived diver dives ditty dizzy docks dodge dodos doers doffs doggy dogma doily doing doits doles dolls dolly dolts domes donor donut dooms doors doped dopes dopey dorks dorky dorms dorts doses dotal doted doter dotes dotty doubt dough douse doved dover doves dowdy dowel dower downs downy dowry dozed dozen dozer dozes drabs draff draft drags drain drake drama drams drank drape draul draws drawl dread dream drear dregs dress dried drier dries drift drill drink drips drive droll drone drool droop drops dross drove drown drugs drums drunk drupe dryly ducts duded dudes duels duets duffs dukes dulls dully dulse dummy dumps dumpy dunes dungs dunks duper dupes ducts dusky dusts dusty duvet dwarf dwell dwelt dyer dyers dying dynes
eager eagle earns earnt earth eased easel eases eason easts eats eaves ebbed ebony eched eches echos echoe eddy edge edger edges edict edify edits eider eight eject eking eland elate elbow elder elect elegy elfin elite elope elude elves emails embed ember emend emery emirs emits empty enact ended endow enemy enjoy ennui enoki enrol ensue enter entry enure envoy eosin epics epoch epoxy equal equip erase erect ergot erode erred error erupt essay ether ethic ethos ethyl etude evade evens event every evict evils evoke ewers exact exalt exams excel execs exert exile exist exits expel extol extra exult eyers eying eyrie
fable faced faces facet facts fades fails faint fairs fairy faith faked faker fakes falls false famed fames fancy fangs fanes fanny farad farce fared fares farms farts fasts fatal fated fates fatty fault fauna fauns favor fawns fazed fazes fears feast feats fecal feeds feels feign feint fells felt fence fends feral ferns ferry fesse fetal fetch feted fetes fetus feuds fever fewer feyed fiats fiber fibre fiche fiefs field fiend fiery fives fifth fifty fight filch filed filer files fills filly films filmy filth final finds fined finer fines finis finny fired firer fires firms first firth fishy fists fitch five fiver fixes fizzy fjeld fjord flack flags flail flair flake flaky flank flaps flare flash flask flats flaws flaxy flays fleas fleck fleer flees fleet flesh flew flex flick flied flier flies fling flint flips flirt flits float flock flocs floes flogs flood floor flops flora floss flour flout flown flows flowy fluff fluid fluke fluky flume flung flunk flush flute flyby foals foams foamy focal focus foggy foils foist folds folks folly fonts foods fools foots foray force fords fores forge forgo forks forty forth forts forty forum fouls found fount fours fovea fowls foxed foxes foyer frags frail frame frank frass fraud frays freak freed freer frees fresh frets friar fried frier fries frill frisk frith frizz frock frogs frond front frost froth frown froze fruit frump fryer fudge fuels fugal fugue fully fumed fumer fumes funds fungi funky funny furly furor furry furze fused fusee fuses fussy fusty fuzed fuzes fuzzy
gable gadds gadgy gaffs gaged gager gages gaily gains gaits galas gales galls gally gamba gamed gamer games gamey gamic gamin gamma gamps gamut gangs gaols gaped gaper gapes garbs garer garth gases gasps gassy gated gates gator gauds gaudy gauge gaunt gauss gauze gavel gawks gawky gawps gazed gazer gazes gears gecko geeks geeky geese gelds gelid gemma gems gene gents genus germs germy gesso gets ghost ghoul giant gibed giber gibes gifts gigas gigot gilds gills gilly gilts gimps gings gipsy girds girls girts girth gists given giver gives glace glade glads gland glare glass glaze gleam glean glebe glees glens glide glime glims glint gloat globe globs gloms gloom glory gloss glove glows gloze glued gluer glues gluey glums gluts glyph gnarl gnash gnats gnaws gnome goads goals goats godly goers gofer going golds golfs gomer gongs goods goody goofs goofy goons goops goose gored gores gorge gorse goths gouge gourd gouts gouty gowns grabs grace grads graft grail grain grams grand grant grape graph grasp grass grate grave gravy grays graze great greed greek green greet grids grief grill grime grimy grind grins grips grist grits groan groat grogs groin groom grope gross group grout grove growl grown grows grubs gruel gruff grump grunt guano guard guava guess guest guide guild guile guilt guise gulch gulfs gulls gully gulps gumbo gummy gunks gunky gunny guppy gurus gushy gusts gusty gutsy gutty guyed gybes gypsy gyred gyres gyros girth
habit hacks hades hafts haiku hails hairs hairy hakes haled haler hales halls hallo halts halve hames hammy hands handy hangs hanks hanky happy hards hardy hares harks harms harps harpy harry harsh harts harts hasps haste hasty hatch hated hater hates hauls haunt haute haven haves havoc hawks hawks hayed hazes hazel heads heady heals heaps heard hears heart heath heats heave heavy hedge heeds heels hefts hefty heirs heist hello helms helps hence henna herbs herds herds heres heros herns heron hertz hewer hexad hexes hicks hides hieed highs hiked hiker hikes hills hilly hilts hinds hinge hints hippo hippy hired hires hitch hived hives hoagy hoars hoary hoax hobby hocks hocus hoers hoists holds holed holes holly holms holts holy homes homey hones honey honks honor hoods hoofs hooks hooky hoops hoots hoped hopes horde horns horny horse hosts hotel hotly hound hours house hovel hover howdy howls hulas hulls human humid humic humid humps humpy humus hunch hunks hunky hunts hurls hurly hurry hurts husks husky hutch hymns hyped hyper hypes hypos
iambs icier icily icing icons ideal ideas idiom idiot idled idler idles idols idyll igloo iglus ikons image imago imbed imbue impel imply inane inapt incur index indie inept inert infer infix infos infra ingot inked inker inlay inlet inner input inset inter intro inure ionic iotas irate irked irons irony isles islet issue itchy items ivory
jacks jaded jades jails jambs james japed japer japes jars jatos jauk jaunt javas jawed jazzy jeans jeeps jeers jelly jenny jerks jerky jests jesus jetsam jetty jewel jibed jiber jibes jiffs jiggy jills jilts jimmy jingo jinks jinns jinny jived jiver jives jocks joins joint joked joker jokes jolly jolts joram jotas jotty joust jowls jowly joyed judge judos juice juicy juked jukes julep jumbo jumps jumpy junco junks junky junta junto jupes juror jurys justs jutes
kails kames kanas kanes kaphs karma karns karts katas kavas keels keens keeps keggs kelly kelps kelpy kemps keno kens kepis kerbs kerfs kerns ketch keyed khans khats kibes kicks kicky kiddi kiefs kiers kills kilns kilos kilts kinas kinds kines kings kinks kinky kinos kiosk kirks kited kites kiths kitty kivas kiwis knack knaps knave knead knees knelt knife knish knits knobs knock knoll knots knows koala koans kohls kois kolas kolos kooks kooky kophs koras kotow kraal kraft krill krona krone kudos kudus kufis kurus kyats kyles kytes
label labia labor laced lacer laces lacks laden lader lades ladle lagan lager laics laird lairs laity lakes lalls lamas lambs lamed lamer lames lamps lance lands lanes lanky lapel lapse larch lards lardy lares large largo larks larky larva laser lased laser lasso lasts latch lated later latex laths lathy latin lauds laugh laura laval lavas laved laver laves lawns lawny laxly layed layer lazar lazed lazes leach leads leafy leaks leaky leans leant leaps leapt learn lease leash least leats leave ledge leech leeds leeks leers leery leets lefts lefty legal leger leggy legit leman lemma lemon lemur lends lenis lenos lense lents leper lepta leper letch levee level lever levin lewis lexes lexis liars libel licks lidos liege liens liers lieus lifts light liked liken liker likes lilac lilts limbs limbo limby limed limen limes limit limns limos limps linac lined liner lines lingo links linky linns linos lints linty lions lipid lips lisps lists liter lithe litas lives livid llama loads loafs loams loamy loans loath lobes local lochs locks locos lode lodge lofts loges logic logos loins lolls lolly loner longs looks loons loony loops loopy loose loots loped loper lopes loppy lords lores lorry loser loses loss lost lotas lotic lotos lotus lough loups loupe lours louse lousy louts loved lover loves lowed lower lowly loyal lubes lucid lucks lucky lucre lulls lulus lumas lumen lumps lumpy lunar lunas lunch lunes lungs lunge lunge lurch lured lurer lures lurid lurks lusts lusty lutes luvvy luxes lying lymph lynch lyres lyric lysed lyses
maced macer maces macho macks macro madam madly mafia mages magic magma magot maids mails maims mains maize makes maker makes makos males malls malms malts malty mamas mamba mambo mamey mamma mammy manes mange mango mangy mania manic manly manna manor manse manta manus many mapes maple mappy maras marcs mares marge marks marls marly marry marsh marts masks mason masse masts match mated mater mates maths matts mauds mauls mawn maxis mayas maybe mayor mazes mazed mazer meads meals mealy means meant meats meaty mecca medal media medic meeds meets meiny melba melds melds melic mells melon melts memos mends menus meows mercs mercy meres merge merit merry mesad mesas meshy messy metal meted meter metes meths metro mewed mewls mezzs micas micks micro midas midge midis miens miffs miffy might miked mikes milch miles milks milky mills milos milts mimed mimeo mimes mimic minas mince minds mined miner mines mings minim minis minks minos mints minty minus mired mires mirks mirky misdo miser mists misty miter mites mitts mixed mixer mixes mixup moans moats mocks modal model modem modes modis modus mohel moils moira moire mojo mokes molar molds moldy moles molls molts mommy monad money mono month moons moony moors moory moose moots moped moper mopes moped moral moras morel mores morns moron morph morse morts mosey mosh mossy mosts motel motes motel moths motley motor motto moues mould moult mound mount mourn mouse mousy mouth moved mover moves movie mowed mower mown mozos mucks mucky mucus muddy mudra muffs mufti muggy muids muirs mulch mules mulct mulls mulls mumba mumbo mummy mumps mumus munch mungs mungi munis muons mural mures murex murks murky murra murre mused muser muses mushy music musks musky musos mussy musts musty muted muter mutes mutts muzzy mylar mynas myths
nadir naffs nagas nails naive naked named namer names nancy nanny napes nappy narcs nards nares naris nary natal nates natty naval naves navel navvy nears neats necks needs needy neems neeps neigh neist nenes neons nerds nerdy nerks nerve nervy nests netts never neves newel newly newsy newts nexus nicer niche nicks niece nifty night nihil nills nimbi nines ninja ninny ninth niped nipes nites nits nixed nixes noble nobly nocks nodal nodes noels noise noisy nomad nonce nones nongs nonis nooks noon noops noose norms north nosed noses nosey notch noted noter notes nouns novas novel nowts nubby nudes nudge nuked nukes nulls numbs nurse nutty nymph
oaken oaker oaks oared oaten oaths obeys oboes ovoid ocean ocher odors ofays offer often ogive ogled ogler ogles ogres ohias ohing oiled oiler okay okays okras olden older oleic olios olive omens omits onion onset oozed oozes opals opens opera opine opium opted optic orbit order organ oriel orles ortho other otter ought ounce ousts outer outdo outgo ovals oven over overt ovine ovoid owing owned owner oxeye oxide oxime ozone
paced pacer paces packs pacts paddy padré paean pagan paged pager pages paiks pails pains paint pairs paled paler pales palla palls palms palmy palps palsy palsy pampa pands panes pangs panic pansy pants pappy papas papaw paper paras parch pards pared parer pares paris parks parky parry parse parts party pasha passé pasta paste pasts pasty patch pater paths patio patly patty pause paved paver paves pawed pawls pawns peaks peaky peals peans pearl pears peart pease peats peaty pechs pecks pecky pedal peeks peels peens peeps peers peeve peins pekes pelts penal pence pends penis penny peons peony pepos peppy perry perch peril perks perky perms perry pesky pesos pests petal peter petit petty pewee phage phase phial phlox phone phono phony photo phots phyla piano picks picky picot piece piers pieta piety piggy pikas piled piles pills pilot pimps pinch pined pines pings pinks pinky pinna pinot pinta pinto pints pious piped piper pipes pipit pique pitch piths pithy piton pitta pivot pixel pixie pizza place plaid plain plait plane plank plans plant plash plasm plate plats platy plays plaza pleas pleat plebe plebs pleds plews plied plies plink plods plops plots plows ploys pluck plugs plumb plume plums plumy plunk plush poach pocks pocky poems poets pogos poise poked poker pokes polar poled poler poles polio polka polls polly polos polyp polys pomes pomos pomps ponds pones pongs pooch poofs poohs pools poops poopy popes poppy porch pored pores porks porky porno ports posed poser poses posit posse posts pouch poufs pours pouts power prams prank prate prats prawn prays preen prees preps press preys price prick pride pried pries prigs prime primp prims prink print prior prism privy prize proas probe prods profs progs proms promo prompt prone prong proof props prose prosy proud prove prowl prows proxy prude prune psalm pseud pshaw pshat psych pubes pubis pucks pudgy pudus puffs puffy puggy pujas puked pukes pulas puled puler pules pulls pulpy pulps pumas pumps punch punks punky punny punts punty pupae pupas pupil puppy purer puree purge puris purls purrs purse purty pushy pussy putts putty pygmy pylon pyres pyric pyros pyxis
qaids qanats qibla qophs quack quads quaff quags quail quais quake quaky quale qualm quant quare quark quart quash quasi quate quats quays queen queer quell quern query quest queue queys quick quids quiet quill quilt quint quips quire quirk quirt quite quits quoin quoit quota quote quoth qursh
rabbi rabid raced racer races racks radar radii radio radix radon rafts ragas raged rages raggy raids rails rains rainy raise rajas raked raker rakes rally ralph raman ramed rames ramps ranch rands randy range rangy ranis ranks rants raped raper rapes rapid rarer rased rases rasps raspy ratal rated rater rates rathi ratio ratty rauns raved ravel raven raver raves ravin rawly razed razer razes razor reach react reads ready realm reams reaps rears reata reave rebel rebus rebut recap recur recut redds reedy reefs reeks reeky reels reeve refer refit regai regal rehab reign reins relax relay relic remit remix renal rends renew rents repay repel reply rerun resat reset resin rests retch retro retry reuse revel revue rheas rheum rhino rhumb rhyme rials ribby riced ricer rices richy ricks rider rides ridge ridgy riels rifer rifle rifts right rigid rigor rills rimed rimer rimes rinds rings rinks rinse riots ripen riper ripes risen riser rises risks risky rites ritzy rival rived riven river rives rivet roach roads roams roans roars roast robed robes robin robot rocks rocky rodeo roger rogue roils roily roles rolls roman romps ronds rones ronts roods roofs rooks rooky rooms roomy roost roots rooty roped roper ropes ropy roses rosin rotor roues rouge rough round rouse roust routs roved rover roves rowan rowed rowel rower rowdy royal rubes ruby rucks rudds ruddy ruder ruffed ruffs rugae rugby ruins ruled ruler rules rumba rumen rummy rumor rumps runes rungs runic runny runts rupee rural ruses rushy rusks rusts rusty ruths
sabal saber sable sabot sabre sacks sacra sadly safer safes sagas sager sages sago sails sains saint saith sake sakis sales sally salon salsa salts salty salve salvo samba sambo samey sammy sampi samps sands sandy saned saner sanes sange sangs sapor saris sarks sassy satay sated sates satin satyr sauce saucy sauls sault sauna sauté saved saver saves savor savvy sawed sawer saxes sayer scabs scads scald scale scalp scaly scamp scams scans scant scape scare scarf scarp scars scart scary scats scaup scene scent schwa scion scoff scold scoop scoot scope score scorn scour scout scowl scows scram scrap scray scree screw scrip scrod scrub scuba scuds scuff scull sculp scums scups scurf scuta seals seams seamy sears seats sebum sects sedan sedge sedgy sedum seeds seedy seeks seels seems seeps seers segue seifs seine seize selah sells selva semen semi sends senna senor sense senti sents sepal sepia sepoys septa serai serfs serge serif serge serin serms serow serum serve servo setae seton setts setup seven sever sewed sewer sexes sexed sexer sexts shack shade shady shaft shags shahs shake shako shaky shale shall shalt shaly shame shams shank shape shard share shark sharp shave shawm shaws sheaf shear sheds sheen sheep sheer sheet sheik shelf shell shent sheol shied shier shies shift shill shily shims shine shins shiny ships shire shirk shirr shirt shits shive shoal shoat shock shoed shoer shoes shoji shone shook shoot shops shore shorn short shots shout shove shown shows showy shred shrew shrub shrug shuck shuns shunt shush shuts shyly sials sibyl sices sicko sicks sidle siege sieve sifts sighs sight sigma signs silks silky sills silly silos silts silty simar simps since sines sinew sings sinhs sinks sinks sinus sired siree siren sires sirup sisal sissy sited sites situs sixes sixth sixty sized sizer sizes skate skeet skegs skein skelp skene skeps skews skied skier skies skiff skill skimp skims skins skint skips skirt skits skive skuas skulk skull skunk skyed skyer slabs slack slags slain slake slams slang slant slaps slash slate slats slave slaws slays sleds sleek sleep sleet slept slews slice slick slide slier slily slimed slimes slimy sling slink slips slits slobs sloes slogs sloid sloop slops slope slosh sloth slots slows slued slues slugs slump slums slung slunk slurp slush sluts slyly smack small smart smash smear smell smelt smews smile smirk smite smith smock smogs smoke smoky smolt smote smuts snack snafu snags snail snake snaky snaps snare snarl snash snath snaws sneak sneap sneer snell snick snide sniff snips snits snobs snogs snood snook snoop snore snort snots snout snowy snubs snuck snuff snugs soaks soaps soapy soars sober socks socle sodas soddy sofas softs softy soils soire solar soldo soled soles solid solos solum solve somas sonar sones songs sonic sonny soon sooth sooty soppy soras sorbs sordi sords sorer sores sorry sorts sorus sough souls sound soups soupy sours souse south sowed sower sowps space spade spads spake spall spams spank spans spare spark spars spasm spate spats spawn spaws spays speak spear specs speed speer speil spell spend spent sperm spews spica spice spicy spied spiel spier spies spike spiky spile spill spilt spine spins spiny spire spiry spits spite spivs splat splay split spoil spoke spoof spook spool spoon spoor spore sport spots spout sprad sprag sprat spray spree sprig sprue spuds spued spues spume spumy spunk spurn spurs spurt sputa squad squat squaw squeg squib squid squit stabs stack staff stage stags stagy staid stain stair stake stale stalk stall stamp stand stane stang stank staph stare stark stars start stash state stave stays stead steak steal steam steed steel steep steer stein stems steno stent steps stern stets stews stick stied sties stiff stile still stilt sting stink stint stirs stoas stoat stobs stock stogy stoic stoke stole stoma stomp stone stony stood stool stoop stops store stork storm story stoup stout stove stows strap straw stray strep strew stria strip strop strut stubs stuck studs study stuff stump stung stunk stunt style stymy suave subas subdu sucks sudor sudsy suede suers suets sugar suing suite suits sulks sulky sully sumac sumas sumis sumos sumps sunna sunny sunup super sural surds surer surfs surge surly surra sushi sutor suttle swabs swads swage swags swain swale swami swamp swams swank swans swaps sward swarf swarm swart swash swath swats sways swear sweat swede sweep sweet swell swept swift swigs swill swims swine swing swink swipe swirl swish swiss swive swobs swoon swoop sword swore sworn swots swoun swum swung sycee sykes sylph syncs synod synth syren syria syrup sysop
tabby taber tabes tabid taboo tabor tabun tabus taces tacet tacks tacky tacos tacts tades taels taffy tahrs taiga taigs tails tains taint taits takas taken taker takes talas talcs tales talky talks tally talon taluk talus tamed tamer tames tamis tammy tamps tango tangs tangy tanks tansy tanto tapas taped taper tapes tapir tapis tappy tardy tared tares targe tarns taros tarps tarot tarps tarry tarsi tarts tarty tasks tasty tater tates tatty taupe tauts tawny taxed taxer taxes taxis taxus teads teak teal teams tears teary tease teats techs techy teddy teems teens teeny teeth teffs tegus tehrs teils teind telae teles telos tells telly temer tempo temps tempt tench tends tenet tenny tenor tense tenth tents tepee tepid terai terce terfs terms terns terra terse tests testy tetra texts thali thane thank thanx tharm that thaws theca theft thegn their theme thens there therm these theta thews thick thief thigh thine thing think thins third thole thong thorn thoro those thots tough three thrip throb throe throw thrum thuds thugs thumb thump thurl thurm thurs thusy thyme tiara tibai tibal tical ticks ticta tidal tided tides tiers tiffs tiger tight tikes tikis tilde tiled tiler tiles tills tilth tilts timed timer times timid tines tinge tings tinny tints tipsy tired tires tirls tithe title titty tivys toads toady toast tobed tobes tobys tocks tocos today toddy toeas toffs tofts tofus togas toged toger toges togue toils toits tokay token tokos tolly tolas tolds toled toles tolls tombs tomes tommy tonal toned toner tones tongs tonic tonka tonne tonny tonus toons tooth toots topaz topes tophe tophi tophs topic topos toque torah toras torcs torch torcs tores toric toris torns toros torot torrs torso torts torus toses total toted totem toter totes touch tough tours touts towed towel tower towns toxic toxin toyed toyon trace track tract trade trail train trait tramp trams traps trash trave trawl trays tread treat trees treks trend tress trews treys triad trial tribe trice trick tried trier tries trill trims trine trios tripe trips trite troat trods trogs trois troll tromp trona trone troop trope troph troth trots trout trove trowl trows troy true trued truer trues trugs trump trunk truss trust truth tryer tryst tsars tubes tuffs tufts tulip tulle tummy tumor tumps tunas tuned tuner tunes tunics tunis tunny tuque turds turfs turns turps tusks tutor tutus twain twang twas twats tweed tween tweet twill twine twins twirl twist twits tying tykes tykes types typos tyres tyros
ubers udder udons ulcers ulnar ulnas ultra umbel umber umbra umias unapt unarm unary unbar unbid unbox uncap uncle uncut under undid undue unfed unfit unify union unite units unity unlit unman unmet unpin unsay unset untie until unwed upend upped upper upset urban urged urger urges urine usage users usher using usual usurp usury uteri utter uveal uvula uxors
vacas vaded vades vagal vague vails vains vairs vales valet valid valor value vamps vanes vangs vapid vapor vares varia varis varus vases vastly vasty vatic vault vaunt veals vealy vedic veeps veers veery vegas veils veins velar velds veldt venae venal vends venom vents venue verbs verge verse verso verts verve vests vexed vexer vexes vials vibes vicar vices video views vigas vigil vigor viler villa villi vills vimen vinal vines vinic vinos vinyl viols viper viral vireo vires virus visas vised vises visit vista vitae vital vitas vitro vivid vixen vizir vocal vodun vogue voice voids voila voile volar voles volts votes voter vowed vowel vows vrows vulva
waded wader wades wadis wafer wafts waged wager wages wagon waifs wails wains waist waits waive waked waken waker wakes wales walks walls waltz wames wands waned wanes wanly wants wards wares warms warns warps warts warty washy wasps waste watch water watts wauls waves waved waver wavy waxed waxen waxer waxes weals weans wears weary weave wedge weedy weeks weeps weepy weest wefts weigh weird weirs welds wells welsh welts wench wends wents wefts weirs welds wells welsh welts wench wends wents wetly whack whale wharf whats wheat wheel whelk whelm whelp whens where whets wheys which whiff whigs while whims whine whiny whips whirl whirr whirs whisk whist white whits whizz whole whomp whoop whore whorl whose whoso whump wicks widen wider width wield wiles wilds wills willy wilts wince winch winds windy wines wings wingy winks winos winze wiped wiper wipes wired wirer wires wiser wisps wispy witch witty wives wizen woads woken wolds wolfs woman wombs women wonky woods woody wooed wooer woofs wools wooly woozy words wordy works world worms wormy worry worse worst worth would wound woven wrack wraps wrath wreak wreck wrens wrest wried wrier wries wring wrist write writs wrong wrote wroth wrung wryly wurst
xebec xenia xenon xeric xerox xylan xylem xysts
yacht yagis yahoo yards yarns yawls yawned yawns yearly yearn years yeast yells yelps yenta yerba yeses yetis yield yodel yodels yodle yogas yogic yogis yoked yokel yokes yolks yores young yours youth yucca yucky yukky yules yumas yummy yurts
zany zarfs zealot zeals zebus zeros zests zesty zetas zilch zincs zings zingy zippy zitis zloty zonal zoned zones zonks zooms zoons zoris zymes
`.trim().split(/\s+/).filter(w => w.length >= 3);

// ── Trie Implementation ──
class TrieNode {
  constructor() {
    this.children = {};
    this.isWord = false;
    this.word = null;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const ch of word.toLowerCase()) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.isWord = true;
    node.word = word.toLowerCase();
  }

  hasPrefix(prefix) {
    let node = this.root;
    for (const ch of prefix.toLowerCase()) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return true;
  }

  isWord(word) {
    let node = this.root;
    for (const ch of word.toLowerCase()) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return node.isWord;
  }

  getNode(prefix) {
    let node = this.root;
    for (const ch of prefix.toLowerCase()) {
      if (!node.children[ch]) return null;
      node = node.children[ch];
    }
    return node;
  }
}

// ── Build global trie ──
const TRIE = new Trie();
const WORD_SET = new Set();
for (const w of WORD_LIST_RAW) {
  const clean = w.toLowerCase().replace(/[^a-z]/g, '');
  if (clean.length >= 3) {
    TRIE.insert(clean);
    WORD_SET.add(clean);
  }
}

// ── Rarity scoring ──
const COMMON_WORDS = new Set(['the','and','for','are','but','not','you','all','can','her','was','one','our','out','day','get','has','him','his','how','its','may','now','old','own','say','she','too','use','way','who','did','let','put','say','sit','too','ask']);
function getRarity(word) {
  if (word.length >= 7) return 'rare';
  if (word.length >= 5) return 'uncommon';
  if (COMMON_WORDS.has(word)) return 'common';
  return 'common';
}
function getRarityMult(word) {
  const r = getRarity(word);
  return r === 'rare' ? 5 : r === 'uncommon' ? 2 : 1;
}
function scoreWord(word) {
  return word.length * 10 * getRarityMult(word);
}

// ── Puzzle Generation ──
const GRID_SIZE = 5;
const DIRS = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

// Seeded RNG (mulberry32)
function seededRng(seed) {
  let s = seed >>> 0;
  return () => {
    s += 0x6D2B79F5;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function getDailySeed() {
  const d = new Date();
  return parseInt(`${d.getUTCFullYear()}${String(d.getUTCMonth()+1).padStart(2,'0')}${String(d.getUTCDate()).padStart(2,'0')}`);
}

// Frequency-weighted letter distribution
const LETTER_FREQ = {
  A:8,B:2,C:3,D:4,E:12,F:2,G:2,H:3,I:7,K:1,L:4,M:2,N:6,O:8,P:2,R:6,S:6,T:9,U:4,V:1,W:2,Y:2
};
function buildLetterPool() {
  const pool = [];
  for (const [l, freq] of Object.entries(LETTER_FREQ)) {
    for (let i = 0; i < freq; i++) pool.push(l);
  }
  return pool;
}
const LETTER_POOL = buildLetterPool();

function generateGrid(seed) {
  const rng = seededRng(seed);
  // Pick 25 letters with vowel guarantee (at least 8 vowels)
  const vowels = ['A','E','I','O','U'];
  const letters = [];
  // Force some vowels first
  const vowelCount = 8 + Math.floor(rng() * 3);
  for (let i = 0; i < vowelCount; i++) {
    letters.push(vowels[Math.floor(rng() * vowels.length)]);
  }
  while (letters.length < 25) {
    letters.push(LETTER_POOL[Math.floor(rng() * LETTER_POOL.length)]);
  }
  // Shuffle
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters;
}

// BFS/DFS to find all valid words in grid
function findAllWords(grid) {
  const found = new Map(); // word -> [{path}]

  function dfs(row, col, visited, pathStr, currentWord, node) {
    const newWord = currentWord + grid[row * GRID_SIZE + col].toLowerCase();
    const newNode = node.children[grid[row * GRID_SIZE + col].toLowerCase()];
    if (!newNode) return;

    visited[row * GRID_SIZE + col] = true;

    if (newNode.isWord && newWord.length >= 3) {
      if (!found.has(newWord)) {
        found.set(newWord, [...pathStr, row * GRID_SIZE + col]);
      }
    }

    if (newWord.length < 8) {
      for (const [dr, dc] of DIRS) {
        const nr = row + dr, nc = col + dc;
        if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
          const ni = nr * GRID_SIZE + nc;
          if (!visited[ni]) {
            dfs(nr, nc, visited, [...pathStr, row * GRID_SIZE + col], newWord, newNode);
          }
        }
      }
    }

    visited[row * GRID_SIZE + col] = false;
  }

  const visited = new Array(25).fill(false);
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      dfs(r, c, visited, [], '', TRIE.root);
    }
  }

  return found;
}

// Generate puzzle for a given date seed
function generatePuzzle(seed) {
  seed = seed || getDailySeed();
  let grid, words;
  let attempts = 0;

  // Keep regenerating until we have enough words
  do {
    grid = generateGrid(seed + attempts);
    const found = findAllWords(grid);
    // Filter to 3-8 letter words
    words = [];
    for (const [word, path] of found) {
      if (word.length >= 3 && word.length <= 8) {
        words.push({ word, path, score: scoreWord(word), rarity: getRarity(word) });
      }
    }
    attempts++;
  } while (words.length < 15 && attempts < 20);

  // Sort by length then alpha; pick a balanced target set
  words.sort((a, b) => b.word.length - a.word.length || a.word.localeCompare(b.word));

  // Show up to 25 as target words, at least 12 as minimum requirement
  const targetWords = words.slice(0, Math.min(words.length, 25));

  return {
    grid,
    targetWords,
    allWords: new Map(words.map(w => [w.word, w])),
    seed,
    date: new Date().toISOString().slice(0, 10),
    minRequired: Math.min(12, Math.floor(targetWords.length * 0.6)),
  };
}

// Validate a word given current grid
function validateWordPath(word, grid) {
  const lower = word.toLowerCase();
  if (lower.length < 3) return null;
  if (!TRIE.isWord(lower)) return null;

  // BFS to find valid path
  function dfs(pos, idx, visited) {
    if (idx === lower.length) return visited.slice();
    for (const [dr, dc] of DIRS) {
      const r = Math.floor(pos / GRID_SIZE) + dr;
      const c = (pos % GRID_SIZE) + dc;
      const ni = r * GRID_SIZE + c;
      if (r >= 0 && r < GRID_SIZE && c >= 0 && c < GRID_SIZE && !visited.includes(ni)) {
        if (grid[ni].toLowerCase() === lower[idx]) {
          const path = dfs(ni, idx + 1, [...visited, ni]);
          if (path) return path;
        }
      }
    }
    return null;
  }

  for (let start = 0; start < 25; start++) {
    if (grid[start].toLowerCase() === lower[0]) {
      const path = dfs(start, 1, [start]);
      if (path) return path;
    }
  }
  return null;
}

// Export
window.WordForgePuzzle = {
  generatePuzzle,
  validateWordPath,
  getDailySeed,
  scoreWord,
  getRarity,
  getRarityMult,
  GRID_SIZE,
  TRIE,
  WORD_SET,
};
