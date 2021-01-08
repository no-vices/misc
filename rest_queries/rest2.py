
import requests

def getWinnerTotalGoals(competition, year):
	r=requests.get('https://jsonmock.hackerrank.com/api/football_competitions?name='+str(competition)+'&year='+str(year)).json()
	#r=requests.get('https://jsonmock.hackerrank.com/api/football_competitions?name=UEFA Champions League&year=2011').json()
	team=r['data'][0]['winner']
	c=0
	r=requests.get('https://jsonmock.hackerrank.com/api/football_matches?competition='+str(competition)+'&year='+str(year)+'&team1='+str(team)+'&page=1').json()
	total1=int(r['total_pages'])
	per2=int(r['total'])

	for j in range(1,total1+1):
		r=requests.get('https://jsonmock.hackerrank.com/api/football_matches?competition='+str(competition)+'&year='+str(year)+'&team1='+str(team)+'&page='+str(j)).json()
		try:
			for i in range(0,per2):
				team1=r['data'][i]['team1goals']

				c+=int(team1)

		except:
			pass
			
	r1=requests.get('https://jsonmock.hackerrank.com/api/football_matches?competition='+str(competition)+'&year='+str(year)+'&team2='+str(team)+'&page=1').json()
	total2=int(r1['total_pages'])
	per3=int(r1['total'])
	for j in range(1,total2+1):
		r=requests.get('https://jsonmock.hackerrank.com/api/football_matches?competition='+str(competition)+'&year='+str(year)+'&team2='+str(team)+'&page='+str(j)).json()
		try:
			for i in range(0,per3):
				team2=r1['data'][i]['team2goals']
				c+=int(team2)
		except:
			pass

			
	return c
if __name__== '__main__':
	competition='UEFA Champions League'
	year='2011'
	t=getWinnerTotalGoals(competition, year)
	print (t)