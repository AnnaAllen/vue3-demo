import type { Plugin } from 'vite'
import * as babel from '@babel/core'
import jsx from '@vue/babel-plugin-jsx'

export default function ():Plugin {
  return {
    name: 'vite-plugin-vue-tsx',
    transform(code, id) {
      console.log(code, id);
      
    }
  }
}
