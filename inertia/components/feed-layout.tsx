export default function FeedLayout() {
  return (
    <div className="feed-layout">
      <div>
        <div className="eyebrow">Fil de la communauté</div>
        <div className="feed-title">
          Ce qui se mange, <em>ce soir</em>, à Abidjan
        </div>
        <div className="feed-sub">247 nouveaux avis publiés cette semaine</div>

        <div className="review-card">
          <div className="photo-ph">
            <div className="ph-label">Attiéké poisson braisé</div>
          </div>
          <div className="review-body">
            <div className="review-top">
              <div>
                <div className="place-name">Chez Tantie Awa</div>
                <div className="place-meta">Cocody · Riviera Golf — Maquis de quartier</div>
              </div>
              <div className="stars">★★★★★</div>
            </div>
            <div className="review-tags">
              <span className="tag quartier">Cocody</span>
              <span className="tag prix">$$</span>
              <span className="tag ambiance">Entre potes</span>
            </div>
            <div className="review-text">
              Le poisson braisé le plus fondant de la Riviera. On y va après 21h pour le vrai coup
              de feu, quand la braise tourne encore. L'attiéké maison change tout.
            </div>
            <div className="review-footer">
              <div className="mini-avatar"></div>
              <span>par Josiane K. · il y a 3h · ajouté à « Garba avant minuit »</span>
            </div>
          </div>
        </div>

        <div className="review-card">
          <div className="photo-ph">
            <div className="ph-label">Salle terrasse</div>
          </div>
          <div className="review-body">
            <div className="review-top">
              <div>
                <div className="place-name">Le Petit Marcory</div>
                <div className="place-meta">Marcory Zone 4 — Restaurant</div>
              </div>
              <div className="stars">★★★★☆</div>
            </div>
            <div className="review-tags">
              <span className="tag quartier">Marcory</span>
              <span className="tag prix">$$$</span>
              <span className="tag ambiance">Romantique</span>
            </div>
            <div className="review-text">
              Coin tranquille, lumière tamisée, service impeccable. Le kedjenou de pintade mérite le
              déplacement. Un peu cher pour la portion, mais l'ambiance justifie tout.
            </div>
            <div className="review-footer">
              <div className="mini-avatar"></div>
              <span>par Bertrand A. · il y a 7h</span>
            </div>
          </div>
        </div>

        <div className="review-card">
          <div className="photo-ph">
            <div className="ph-label">Garba, dressage</div>
          </div>
          <div className="review-body">
            <div className="review-top">
              <div>
                <div className="place-name">Garba de la Gare</div>
                <div className="place-meta">Yopougon Selmer — Street-food</div>
              </div>
              <div className="stars">★★★★★</div>
            </div>
            <div className="review-tags">
              <span className="tag quartier">Yopougon</span>
              <span className="tag prix">$</span>
              <span className="tag ambiance">Rapide</span>
            </div>
            <div className="review-text">
              Le thon est toujours frais, le piment juste assez fort. C'est bruyant, c'est rapide,
              c'est parfait à minuit passé.
            </div>
            <div className="review-footer">
              <div className="mini-avatar"></div>
              <span>par Fatou D. · hier</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="sidebar-block">
          <div className="sidebar-title">Tendances de la semaine</div>
          <div className="trend-item">
            <span>
              <span className="trend-rank">01</span>Chez Tantie Awa
            </span>
            <span className="stars" style={{ fontSize: '11px' }}>
              4.9
            </span>
          </div>
          <div className="trend-item">
            <span>
              <span className="trend-rank">02</span>Maquis du Phare
            </span>
            <span className="stars" style={{ fontSize: '11px' }}>
              4.8
            </span>
          </div>
          <div className="trend-item">
            <span>
              <span className="trend-rank">03</span>Garba de la Gare
            </span>
            <span className="stars" style={{ fontSize: '11px' }}>
              4.7
            </span>
          </div>
          <div className="trend-item">
            <span>
              <span className="trend-rank">04</span>Le Petit Marcory
            </span>
            <span className="stars" style={{ fontSize: '11px' }}>
              4.6
            </span>
          </div>
        </div>

        <div className="sidebar-block">
          <div className="sidebar-title">Autour de vous</div>
          <div className="mini-map">
            <div className="pin" style={{ top: '40%', left: '35%' }}></div>
            <div className="pin" style={{ top: '40%', left: '35%' }}></div>
            <div className="pin" style={{ top: '40%', left: '35%' }}></div>
            <div className="pin" style={{ top: '40%', left: '35%' }}></div>
          </div>
        </div>

        <div className="sidebar-block">
          <div className="sidebar-title">Populaire à Cocody</div>
          <div className="trend-item">
            <span>Chez Tantie Awa</span>
            <span style={{ color: 'var(--muted)', fontSize: '12px' }}>2 min</span>
          </div>
          <div className="trend-item">
            <span>Riviera Grill</span>
            <span style={{ color: 'var(--muted)', fontSize: '12px' }}>8 min</span>
          </div>
          <div className="trend-item">
            <span>Le Bambou Doré</span>
            <span style={{ color: 'var(--muted)', fontSize: '12px' }}>12 min</span>
          </div>
        </div>
      </div>
    </div>
  )
}
