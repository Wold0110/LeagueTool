import axios from 'axios'

class AxiosService {
  constructor() {
  }

  async getChampions(){
    const response = await axios.get('https://ddragon.leagueoflegends.com/cdn/12.17.1/data/en_US/champion.json')
    return response.data.data;
  }

  async getChampionDetail(name){
    const response = await axios.get('http://ddragon.leagueoflegends.com/cdn/12.17.1/data/en_US/champion/'+name+'.json')
    return response.data.data;
  }
  
}

export default (new AxiosService());