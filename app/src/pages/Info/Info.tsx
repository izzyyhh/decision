import { ColumnFullWidth } from "@app/common/Column.sc";
import Seo from "@app/seo/Seo";
import Headline from "@components/Headline/Headline";
import { Column } from "@pages/Welcome/Welcome.sc";
import React, { FunctionComponent } from "react";
import styled from "styled-components";

const InfoPage: FunctionComponent = () => {
    return (
        <>
            <Seo title="Info" />
            <ColumnFullWidth>
                <Headline type="h2">Impressum</Headline>
            </ColumnFullWidth>
            <Column>
                <ColumnFullWidth>
                    <Headline type="h3">Responsible for content</Headline>
                    <Text>Ismail Halili</Text>
                    <Text>Valentin Sebastian Kiefl</Text>
                    <Text>Stefan Maier</Text>
                    <Text>Matthias Riedl</Text>
                </ColumnFullWidth>
            </Column>
            <Column>
                <ColumnFullWidth>
                    <Headline type="h3">Contact</Headline>
                    <Text>Fh Salzburg</Text>
                    <Text>Urstein Süd 1</Text>
                    <Text>5412 Salzburg</Text>
                    <Link href="mailto:mriedl.mmt-b2018@fh-salzburg.ac.at">mriedl.mmt-b2018@fh-salzburg.ac.at</Link>
                </ColumnFullWidth>
            </Column>
            <Column>
                <ColumnFullWidth>
                    <Headline type="h2">Datenschutz</Headline>
                </ColumnFullWidth>
                <ColumnFullWidth>
                    <Text>
                        Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder e-Mail-Adressen) erhoben werden, erfolgt
                        dies soweit möglich stets auf freiwilliger Basis. Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der
                        Kommunikation per e-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist
                        nicht möglich. Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von
                        nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber
                        der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa
                        durch Spam-Mails, vor. Ich willige ein, dass das RADTEAM OBERHOFEN als verantwortliche Stelle die nachstehenden
                        personenbezogenen Daten (Name, Vorname, Geburtsdatum, Email-Adresse, Telefonnummer, Eintrittsdatum) zum Zwecke der
                        Mitgliederverwaltung, des Beitragseinzuges und der Übermittlung von Vereins-informationen durch den Verein verarbeitet bzw.
                        verwendet werden dürfen. Ich willige ein, dass der vorbezeichnete Verein meine E- Mailadresse und, soweit erhoben, auch
                        meineTelefon-/Handynummer zum Zwecke der Kommunikation nutzt. Eine Übermittlung an Dritte wird nichtvorgenommen. Ich willige
                        ein, dass der vorbezeichnete Verein Bilder von vereinsbezogenen oder gesellschaftlichenVeranstaltungen auf der Webseite des
                        Vereins oder sonstigen Vereinspublikationen veröffentlicht undan die Presse zum Zwecke der Veröffentlichung ohne spezielle
                        Einwilligung weitergeben darf. &gt; Eine Übermittlung dieser Daten an den Österreichischen Radsport Verband (ÖRV) findet nur
                        imRahmen der in den Satzungen festgelegten Zwecke statt. Eine weitere Datenübermittlung an Dritte findet nicht statt und ist
                        auch in Anlehnung an dieVereinssatzung verboten. Bei Beendigung der Mitgliedschaft werden die personenbezogenen Daten auf
                        Wunsch gelöscht,soweit sie nicht entsprechend den Vorgaben aufbewahrt werden müssen. Mir ist bewusst, dass ich im Rahmen der
                        Vorgaben der Datenschutz-Grundverordnung das Recht aufAuskunft über die personenbezogenen Daten habe, die zu meiner Person bei
                        der verantwortlichenStelle gespeichert sind. Außerdem habe ich das Recht im Falle fehlerhafter Datenspeicherung aufKorrektur.
                    </Text>
                </ColumnFullWidth>
            </Column>
        </>
    );
};

export default InfoPage;

const Text = styled.p`
    color: white;
    line-height: 30px;
`;

const Link = styled.a`
    color: white;
    line-height: 30px;
`;
