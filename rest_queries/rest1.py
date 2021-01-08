
#r=requests.get('https://jsonmock.hackerrank.com/api/football_matches?year='+str(year)+'&team1='+str(team)+'&page=1').json()

#r=requests.get('https://jsonmock.hackerrank.com/api/football_competitions?name='+str(name)+'&year='+str(year)).json()

import requests

def getTotalGoals(team,year):
	c=0
	r=requests.get('https://jsonmock.hackerrank.com/api/football_matches?year='+str(year)+'&team1='+str(team)+'&page=1').json()
	total1=r['total_pages']
	per2=r['per_page']
	for j in range(1,total1+1):
		r=requests.get('https://jsonmock.hackerrank.com/api/football_matches?year='+str(year)+'&team1='+str(team)+'&page='+str(j)).json()
		try:
			for i in range(0,per2):
				team1=r['data'][i]['team1goals']
				c+=int(team1)
		except:
			pass
			
	r1=requests.get('https://jsonmock.hackerrank.com/api/football_matches?year='+str(year)+'&team2='+str(team)+'&page=1').json()
	total2=r['total_pages']
	per2=r['per_page']
	for j in range(1,total1+1):
		r1=requests.get('https://jsonmock.hackerrank.com/api/football_matches?year='+str(year)+'&team2='+str(team)+'&page='+str(j)).json()
		try:
			for i in range(0,per2):
				team2=r1['data'][i]['team2goals']
				c+=int(team2)
		except:
			pass
			
	return c
if __name__== '__main__':
	team='Barcelona'
	year='2011'
	t=getTotalGoals(team,year)
	print (t)