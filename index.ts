import {
  addFavorite,
  addFolder,
  getFolderContents,
  prettyPrint,
  printRecursive,
  printRecursiveTree,
} from './lib'

function setup() {
  // create folders
  const fExamples = addFolder('Examples', null)
  const fNovartis = addFolder('Novartis', fExamples.id)
  const fRoche = addFolder('Roche', fExamples.id)

  // in root folder
  addFavorite('Basic Example', null)

  // in novartis folder
  addFavorite('Novartis B', fNovartis.id)
  addFavorite('Novartis A (should be first)', fNovartis.id)

  return {
    fExamples,
    fNovartis,
    fRoche,
  }
}

function exampleBasic() {
  const { fExamples, fNovartis } = setup()

  // get root folder
  const root = getFolderContents(null)
  const examples = getFolderContents(fExamples.id)
  const novartis = getFolderContents(fNovartis.id)

  prettyPrint(root, 'root')
  prettyPrint(examples, 'examples')
  prettyPrint(novartis, 'novartis')
}

// Prints all entries recursively:
//
// /
// └─Examples
//   ├─Novartis
//     ├─Novartis A (should be first).txt
//     ├─Novartis B.txt
//   └─Roche
// └─Basic Example.txt
//
function exampleRecursive() {
  setup()

  printRecursive()
  printRecursiveTree()
}

exampleRecursive()
