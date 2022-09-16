import axios from 'axios'

class AxiosService {
  constructor() {
  }

  async getChampions(){
    const response = await axios.get('https://ddragon.leagueoflegends.com/cdn/12.17.1/data/en_US/champion.json')
    return response.data.data;
  }

  async getVersion(){
    const lastVersion = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json').then(response => {
        return response.data[0]
    })
    return lastVersion
  }
}

export default (new AxiosService());