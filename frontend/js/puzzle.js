// ═══════════════════════════════════════════════
//  WordForge — Puzzle Engine & Trie Dictionary
// ═══════════════════════════════════════════════

'use strict';

// ── Embedded word list (curated 4000+ common English words) ──
// Compressed as a flat string array; real deployment would use a full 50k trie
const WORD_LIST_RAW = `
act add age ago aid aim air ale ant apt arc are ark arm art ash ask ate awe axe aye
bad bag ban bar bat bay bed beg bet bid big bin bit bog bow box boy bud bug bun bus but
cab can cap car cat caw cob cod cog cop cot cow cry cub cup cut
dab dad dam dew did dig dim din dip doe dog dot dub due dug dun
ear eat egg ego elf elk elm end era eve ewe eye
fad fan far fat fax fed few fig fin fit fix fly foe fog for fox fry fun fur
gab gag gap gas gel gem get gig gin gnu god got gum gun gut guy
had hag ham has hat hay hem hen hew hid him hip his hit hog hop hot how hub hug hum hut
ice icy ill imp ink ion
jab jag jam jar jaw jet jig job jog joy jug
keg kid kin kit
lab lag lap law lay led leg let lid lip lit log lot low lug
mad man map mar mat maw men met mid mix mob mod mom mop mud mug mum
nab nag nap nit nod nor not now nun
oak oar oat odd ode off oil old one opt orb ore our out owe owl own
pad pan pap par pat paw pay pea peg pen pep per pet pew pie pig pin pit ply pod pop pot pow pro pry pub pug pun pup pus put
rag ran rap rat raw ray red ref rep rev rib rid rig rim rip rob rod rot row rub rug rum run rut rye
sac sad sag sap sat saw say sea set sew she shy sin sip sir sit six ski sky sly sob sod son sop sow soy spa spy sty sub sue sum sun sup
tab tan tap tar tat tax tea ten the thy tie til tin tip toe ton too top tow toy try tub tug two
urn use
van vat vet via vie vim
wad war was wax way web wed wee wig win wit woe wok won woo wow
yam yap yaw yea yen yes yet yew
zap
able aces acid aged ager ages agin ague aide aids aims ails aims airs airy akin alee ales aloe also alto alum amok amid amps ands anew ante anti ants apex apps arch arcs area ares aria arid arks arms army arts arty ashy atop aunt aura auto
babe baby back bald bale ball balm band bane bang bank bans bare bark barn bars base bash bask bass bast bate bath bats baud bawl bays bead beam bean bear beat beef been beer bees beet beg bell belt bend bent beta bets bias bike bile bill bind bins bird bite bits blog blot blow blue blur boar boat body bold bolt bond bone book boom boon boor boot bore born both bout bowl boys brag brew brig brim brink brit brow buck bud buff bulb bulk bull bump bunk burl burn burp burr bury bush busy butt buzz
cafe cage cake calf call calm camp cane card care cart case cash cast cave chad chad char chat chef chew chin chip chop chow chug city clad clan clap claw clay clip clod clog clop clot club clue coal coat code coil coin cold cole colt comp cone cook cool cord core cork corn cost cozy cram crap crew crop crow cube cult curb curl curt cute
dale damp dank dare dark dart dash data date dawn days daze dead deaf deal dean debt deck deep deer deny dew dial dice died dies dire dirt disc dish disk dive dock dogs dole dome done doom door dose dote dove down drab drag draw drew drip drop drug drum dual duel dumb dump dune dunk dusk dust dyer
each earl earn ease east easy edgy edit eels eggs eight elms else emit empt ends epic even ever evil eyes
face fact fade fail fair fake fall fame fang farm fare fast fate fawn faze fear feat feed feel feet fell felt fern feud fibs file fill film find fine fire firm fish fist fits flag flat flaw flea fled flip flit flog flop flow flue foam foal folk fond font fore fork form fort foul four foxy fray free fret from frog frown fuel full
gale game gang garb gate gaze gear gels gems gene gibe gild gilt girl gist give glad glee glen glib glow glum glut goad goat goes gold golf gong goof gore gosh gown grab gram gray grew grim grin grip grit grub
hack hail hair hale hall halt hams hand hang hard hare harm harp hash hate haul have hawk haze hazy head heal heap heat heel helm herd here hide high hill hilt hint hire hoax hobo hold hole home hone hood hoof hook hoop hope horn hose host hour hove hovel howl hull hump hung hunt hurl husk hymn
icon idle inch info inks into iris isle itch item
jade jail jane jaws jean jerk jest jibs jock jogs joke jolt jots jowl joys judo junk jury just
keen keep kelp kibe kick kiln kind king knee knit knob knot know
lack lace lame lamp land lane laps lard lark lass last late laud laud lavs lawn leaf leak lean leap left lend lens lent levy lick life lift like lily lime limp line lint lion lips list live load loaf loam loan lock loft lone long loon loop loot lore lore lorn lose loss lost lots loud lout love luff lure lust lute
mace made maid mail main male mall mane many maps mare mark mars mart mass mast mate mats maze mean meet melt memo mend mesh mile milk mill mime mind mine mint mire miss mite mode mold mole molt moon more most mote moth mould moult mourn move muck mule mull muse musk must mutt
nail name nape nary navy near neat need nest news next nice nigh nine node noel nook noon norm nose note noun now
oath oboe oils omen once only open oral ores over oven
pace pack page paid pail pair pale pall palm pang pare park part pass past pave pawn peak peal pearl peat peel peer pent pick pier pike pile pill pine pink pipe plan play plod plot plow plus poem poet pole poll polo pond pore pork port pose post pots pour pout prey prod prod prow prowl pull pulp pump pure push
quay quit quite quiz quod
race rack raid rail rain rake ramp rang rank rare rash rate rave raze read real ream reap redo reef reel rein rely rend rent rest rice rich ride rife rift ring rise risk road roam roar robe rock rode role roll romp roof room root rope rose rosy rout rove rows rule rune runt ruse rush rusk rust
sack safe sage said sail sake sale salt sand sane sank sash save said scan scar seam scan scar sect seen self sell semi send sent serf shed shim shin ship shire shoal shoe shoo shop shot show shrub shun shut side sigh silk sill silo silt sine sing sink sire site size skid skip slab slap slat slew slid slim slip slog slot slue slum slur snag snap snob snob snog snub snug soak soar sock soil sole sore sort soul soup sour sown span spar spit spot spud spur stab stag star stew stir stop stow stub stud stun such sulk sure swab swam swan swap swat swear swede
tack tale talk tall tame tang tank tape tare taut team teak teal team tear teem tell tilt time tire toil told toll tomb tome tone tong tore torn toss tour tout tram trap tray trek trim trip trod true tuck tune turf turn twin type
ugly ulna undo unit upon
vale vamp vane vary vase vast veil vend vent verb vet vial vide view vile vine visa vise void vote vowed
wade wail wake wane ward ware warm warp wart wave weld well wend went were wire wish woke wolf womb wood wool word wore worm worn wove wrap writ
yawn year yelp yore your yule
able abide about above abuse ached acres acted acute adage adapt added adept admit adobe adobe adult after again agree aisle alert alike alien align aloft alter among ample amuse angel anger angle annex anvil apart apish apple apply apron ardor arise armor arose array aside atlas atone attic audio avail avert avid avoid awoke
baker badly badge banjo beard beast beady begun belle below bench berth blast blaze bless blind bliss block bloom blown bluff boast boggy bogle bonus boost brace braid brain brake brash brave brawl bread break breed breve bribe bride brief bring brisk broke brook broth brunt brute budge bulge bunny burst
cabin camel candy cargo carry cases cause cease cedar cedar chafe chair charm chase cheap check cheek cheer chess chide child chips choir chord civic civil claim clamp clear clerk cliff climb cling cloak clock clone close cloud clout coaxed cobra comet comic coral crack craft crash crave crawl creak cream crest crisp crown cruel crumb cruse crust
daily dairy dance dares dealt decoy delta depot depth derby detox devolve dogma dolor dolce doubt dowdy dowel dowry draft drain drape drawl dread dream dress dried drift drink drool dross drove drown
early earth eclipse eerie eight elbow elder elite ember emend emery empty enact endow enjoy ensue enter entry envoy equal error essay etude evade event every exact exact extra
fable facet faint fairy faith false fancy farce fatal feast fella fence fetus fever fiber fifty fight fiery filth final flack flame flare flash fleck flesh flock flood flour flown flute foamy foil folly force forge found frame frank fraud fresh frisk frond front frost froth froze frump fully fungi
gaunt gauze gavel gawky gauze ghoul given gland glare glaze glide glint gloat gloss glove gnarly gorge gouge gourd grace grade grain grand grant grape grasp grave graze greed greet grill gripe groan groom grope gross grout growl gruel gruff guess guide guild guile guise gusto
haste hasty haven hazel heard heart heavy herald heron hinge hippo hoary hoist holly homer honey honor hopeful horny horse hotel hover howdy human humid humid hunky hurry
ideal idiot image imply index inept infer inlet inset inter intro
jewel jiffy jolly jowls julep jumpy
knave kneel knock knoll known
ladle laden lance lapse laser latch later latus laugh layer leaky leapt learn leery lefty legal lemon lemur level levee liege light lilac liner lingo liter liver livid llama lodge lofty loony loose lover lowly lucid lucky lumen lusty
magic maker mambo mange manor maple march marry marry marsh metal mine minor minus mitre model money mono moose moral mound mourn muddy mummy murky music musty
nadir naive nanny nasal nasal nasty naval nervy needy nerve nettle never nicer night ninja ninny noble noise nonce noose north notch novel
occur ocean offer often olive onset opera optic orbit order outdo outer ovoid
paddy paint panda panel panic papal parse party pasta patch patio paver peace peach pearl pedal penny perky petit phase phone piano pinch pixel pixie pizza place plane plank plant plate plaza pleat plumb plume plunk point polar polka poppy porch prank press pride prime prime print privy probe prone prong proto prove prowl prune psalm pudgy pulpy pupil
queen query quick quiet quite quota quote
radix rainy raven raspy reach realm reedy refer regal reign relax repay reply resin revel rider ridge rifle rivet robot rocky rover rowdy ruler rupee rusty
sabre sadly saint salon sandy sassy sauce saucy savor savvy scald scalp scaly scamp scant scary scoff scold scoop scope score scorn scout scowl scrub seedy sense serum setup seven sever sewer shady shake shale shame shape share shark sheen shelf shell shill shire shirt shock shone shook shore shore short shove shown showy shred shrub shrug shyly sigma silky silly siren sixty skate skiff skill skimp skirt skull slain slake slant slather slave sleek sleep sleet slept slice slide slope sloth slough slump slunk smack small smash smell smite smoke smoky smolt snare sneak snipe snore snout snowy soapy solar solid sonic sooth sorry sound south sowed spark spasm spawn speck speed spell spend spine spire splat spoof spook spool sport spout sprig spunk squat squat staid stain stale stalk stall stamp stand stank stark start stash state stave stead steam steel steep steer stern stiff stoic stoke stone stony stood store stork storm story stout stove strap straw stray strip strut stuck study stump stunt style suave sulky sulky sunny super swami swamp swipe swish swore sword
tacit taffy tally talon tarot tasty tatty taunt taupe tawny tease teddy tepid terse theft thane there thick thief thing think thud thyme tiara tidal tiger till timid tipsy titan toady today token topaz tonic torso total touch touché touchy tough towel tower toxic track trade trail train trait tramp traps trash trawl tread trend trice trick tried tripe trite troth trout trump trust twang twill twist tying
ulcer ultra umbra undue unfed unlit until unwed upset usher usual utter
vapor vault veery venue verse vital vivid vixen vogue voila voter vying
waltz wanna waste watch water weave wedge weedy weigh weird while whiff while whim whirl whisk white whole whose widen wield windy wispy witch wizen woken woozy world worry worse worst worth would wrath wring wrist wrote
yeoman young yours yummy
zesty
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
