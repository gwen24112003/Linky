#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SEO Agent - Linky
Audit et scoring SEO du site
"""
import sys
import io
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import json

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

class SEOAuditor:
    def __init__(self, base_url):
        self.base_url = base_url
        self.score = 0
        self.max_score = 100
        self.issues = []
        self.warnings = []
        self.success = []
    
    def check_page(self, url, depth=0):
        if depth > 3:
            return
        
        try:
            response = requests.get(url, timeout=10, verify=False)
            soup = BeautifulSoup(response.text, 'html.parser')
            
            self._check_title(soup)
            self._check_meta_description(soup)
            self._check_headings(soup)
            self._check_images(soup)
            self._check_links(soup)
            self._check_content(soup)
            
            for link in soup.find_all('a', href=True):
                href = link['href']
                if href.startswith('/') or href.startswith(self.base_url):
                    full_url = urljoin(self.base_url, href)
                    if full_url not in visited:
                        visited.add(full_url)
                        self.check_page(full_url, depth + 1)
                        
        except Exception as e:
            self.warnings.append(f"Erreur sur {url}: {str(e)}")
    
    def _check_title(self, soup):
        title = soup.find('title')
        if title:
            text = title.get_text().strip()
            if len(text) > 60:
                self.warnings.append(f"Title trop long: {len(text)} caracteres")
            else:
                self.success.append(f"Title present: {text[:50]}...")
            self.score += 10
        else:
            self.issues.append("Pas de title trouve")
    
    def _check_meta_description(self, soup):
        meta = soup.find('meta', attrs={'name': 'description'})
        if meta and meta.get('content'):
            content = meta['content']
            if len(content) > 160:
                self.warnings.append(f"Meta description trop longue: {len(content)} caracteres")
            else:
                self.success.append(f"Meta description presente")
            self.score += 10
        else:
            self.issues.append("Pas de meta description")
    
    def _check_headings(self, soup):
        h1 = soup.find_all('h1')
        if len(h1) == 1:
            self.success.append("Un seul H1 present")
            self.score += 10
        elif len(h1) > 1:
            self.warnings.append(f"Multiple H1 trouves: {len(h1)}")
        else:
            self.warnings.append("Pas de H1 trouve")
        
        h2s = soup.find_all('h2')
        if h2s:
            self.success.append(f"{len(h2s)} H2 trouves")
            self.score += 5
    
    def _check_images(self, soup):
        images = soup.find_all('img')
        missing_alt = 0
        for img in images:
            if not img.get('alt'):
                missing_alt += 1
        
        if missing_alt > 0:
            self.warnings.append(f"{missing_alt} images sans alt")
        else:
            self.success.append(f"Toutes les images ont un alt")
            self.score += 10
    
    def _check_links(self, soup):
        links = soup.find_all('a')
        self.success.append(f"{len(links)} liens trouves")
        self.score += 5
    
    def _check_content(self, soup):
        text = soup.get_text()
        word_count = len(text.split())
        if word_count > 300:
            self.success.append(f"Contenu substantiel: {word_count} mots")
            self.score += 15
        else:
            self.warnings.append(f"Contenu court: {word_count} mots")
    
    def get_report(self):
        percentage = min(self.score, 100)
        grade = "A" if percentage >= 80 else "B" if percentage >= 60 else "C" if percentage >= 40 else "D"
        
        return {
            "score": self.score,
            "percentage": percentage,
            "grade": grade,
            "issues": self.issues,
            "warnings": self.warnings,
            "success": self.success
        }

visited = set()

def audit_site(url):
    print(f"Audit SEO de: {url}\n")
    print("=" * 50)
    
    auditor = SEOAuditor(url)
    auditor.check_page(url)
    report = auditor.get_report()
    
    print(f"\nSCORE SEO: {report['percentage']}% (Grade: {report['grade']})")
    print(f"Points: {report['score']}/100")
    
    if report['success']:
        print("\n[OK] Points positifs:")
        for item in report['success']:
            print(f"  + {item}")
    
    if report['warnings']:
        print("\n[⚠] Avertissements:")
        for item in report['warnings']:
            print(f"  ! {item}")
    
    if report['issues']:
        print("\n[ERREUR] Problemes:")
        for item in report['issues']:
            print(f"  - {item}")
    
    print("\n" + "=" * 50)
    
    return report

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description='SEO Auditor')
    parser.add_argument('url', nargs='?', default='https://linky4u.com', help='URL du site a auditer')
    args = parser.parse_args()
    
    audit_site(args.url)
